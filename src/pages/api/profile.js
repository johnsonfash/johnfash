import dotenv from 'dotenv/config'
import { createConnection } from 'mysql2/promise'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const algorithm = 'aes-256-cbc'
const { host, user, password, database, ACCESS_TOKEN, SECRET_KEY } = process.env;

const encrypt = (text) => {
    try {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv(algorithm, SECRET_KEY, iv)
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        return {
            error: false,
            data: JSON.stringify({
                iv: iv.toString('hex'),
                content: encrypted.toString('hex')
            })
        }
    } catch (err) {
        return { error: true, errorMessage: err.message }
    }
}

export const decrypt = (password) => {
    try {
        const hash = JSON.parse(password)
        const decipher = crypto.createDecipheriv(algorithm, SECRET_KEY, Buffer.from(hash.iv, 'hex'))
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
        return { error: false, data: decrpyted.toString() }
    } catch (err) {
        return { error: true, data: null, errorMessage: err.message }
    }
}

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

const editAccount = async (action, id, name, old_password, pass) => {
    try {
        const mysql = await createConnection({ host, password, user, database });
        let row;
        if (action === 'password') {
            const [rows] = await mysql.execute('SELECT `password` FROM `admin` WHERE `id` = ?', [id * 1]);
            if (rows?.length) {
                const old_db_password = decrypt(rows[0].password)
                if (old_db_password.error || old_db_password.data !== old_password) {
                    return { error: true, errorMessage: "invalid old password!" };
                }
                const db_password = encrypt(pass);
                if (db_password.error) return db_password;
                await mysql.execute('UPDATE `admin` SET `password` = ? WHERE `id` = ?', [db_password.data, id * 1]);
                row = rows;
            }
        } else {
            const [rows] = await mysql.execute('UPDATE `admin` SET `name` = ? WHERE `id` = ?', [name, id * 1]);
            row = rows;
        }
        mysql.end();
        if (row) {
            return { error: false, errorMessage: null, data: null };
        } else {
            return { error: true, errorMessage: "unable to update account!", data: null }
        }
    } catch (err) {
        return { error: true, errorMessage: err.message, data: null }
    }
}

const getUser = async (id) => {
    try {
        const mysql = await createConnection({ host, password, user, database });
        const [rows] = await mysql.execute('SELECT `email`, `name`, `username`,`date` FROM `admin` WHERE `id` = ?', [id * 1]);
        mysql.end();
        if (rows?.length) {
            delete rows[0].password;
            return { error: false, errorMessage: null, data: rows[0] };
        } else {
            return { error: true, errorMessage: "user not found!" }
        }
    } catch (err) {
        return { error: true, errorMessage: err.message }
    }
}

export default async function handler(req, res) {
    const token = validToken(req)
    if (token.error) return res.status(401).json(token);
    if (req.method === 'GET') {
        const user = await getUser(token.data.id)
        res.status(200).json(user);
    }
    if (req.method === 'POST') {
        const user = await editAccount(req.body?.action, token?.data?.id, req.body?.name, req.body?.old_password, req.body?.password)
        res.status(200).json(user);
    }
}