import dotenv from 'dotenv/config'
import { createConnection } from 'mysql2/promise'
import { IncomingForm } from 'formidable'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
const { host, user, password, database, ACCESS_TOKEN } = process.env;

const environmentPath = process.env.NODE_ENV === 'production' ? 'https://dunamisbirmingham.org/uploads/' : 'http://localhost:3000/uploads/'

export const config = {
    api: {
        bodyParser: false,
    },
};

export const validToken = (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
            const data = jwt.verify(token, ACCESS_TOKEN)
            if (data != null) {
                return { error: false, data, errorMessage: null }
            }
        }
        return { error: true, errorMessage: 'invalid access token', data: null }
    } catch (err) {
        return { error: true, errorMessage: 'invalid access token', data: null }
    }
}


const generateString = () => Array(15).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')

const fileUpload = async (req) => {
    return await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        form.parse(req, (err, fields, files) => {
            let oldpath = files.image.filepath;
            let filename = generateString() + '.' + files.image.originalFilename.split('.').pop();
            let newpath = path.resolve(__dirname, '../../../../public/uploads') + '/' + filename;
            if (err) return reject({ error: true, errorMessage: err })
            let other_fields = {}
            try {
                if (fields?.data) {
                    other_fields = JSON.parse(fields?.data)
                }
            } catch (e) {
            }
            fs.copyFile(oldpath, newpath, function (err) {
                fs.unlink(oldpath, () => { });
                if (err) return reject(err)
                resolve({ error: false, data: { ...other_fields, image: environmentPath + filename } })
            });
        })
    })
}

const addPicture = async (req) => {
    try {
        const fileData = await fileUpload(req)
        if (fileData.error) return fileData
        const mysql = await createConnection({ host, password, user, database });
        if (fileData.error || !fileData?.data) return fileData;
        const [rows] = await mysql.execute('INSERT INTO `pictures` (`image`) VALUES (?)', [fileData?.data?.image]);
        mysql.end();
        if (rows) {
            return { error: false, errorMessage: null, data: null };
        } else {
            return { error: true, errorMessage: "unable to add picture, please try again!", data: null }
        }
    } catch (err) {
        return { error: true, errorMessage: err.message, data: null }
    }
}

const getPictures = async () => {
    try {
        const mysql = await createConnection({ host, password, user, database });
        const [rows] = await mysql.execute('SELECT * FROM `pictures`');
        mysql.end();
        return { error: false, errorMessage: null, data: rows };
    } catch (err) {
        return { error: true, errorMessage: err.message }
    }
}

const deletePicture = async (id) => {
    try {
        const mysql = await createConnection({ host, password, user, database });
        await mysql.execute('DELETE FROM `pictures` WHERE `id` = ?', [id * 1]);
        mysql.end();
        return { error: false, errorMessage: null, data: null };
    } catch (err) {
        return { error: true, errorMessage: err.message }
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const token = validToken(req)
        if (token.error) return res.status(401).json(token);
        const response = await addPicture(req)
        res.send(response)
    }
    if (req.method === 'GET') {
        let response = { error: false, errorMessage: null, data: [] }
        if (req?.query?.del) {
            const token = validToken(req)
            if (token.error) return res.status(401).json(token);
            response = await deletePicture(req?.query?.id)
        } else {
            response = await getPictures()
        }
        res.send(response)
    }
}