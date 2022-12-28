import dotenv from 'dotenv/config'
import { createConnection } from 'mysql2/promise'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const algorithm = 'aes-256-cbc'
const { host, user, password, database, timezone, ACCESS_TOKEN, SECRET_KEY } = process.env;

export const encrypt = (text) => {
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

export const createToken = (id) => {
    return jwt.sign({ id }, ACCESS_TOKEN, { expiresIn: '15h' })
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

const login = async (username, userpassword) => {
    try {
        const mysql = await createConnection({ host, user, password, database });
        const [rows] = await mysql.execute('SELECT * FROM `admin` WHERE `username` = ? LIMIT 1', [username]);
        mysql.end();
        if (rows?.length) {
            const db_password = decrypt(rows[0].password);
            if (db_password.error) return db_password;
            if (userpassword !== db_password.data) return { error: true, errorMessage: "invalid username or password!" }
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
    if (req.method === 'POST') {
        const user = await login(req.body.username, req.body.password)
        if (!user.error) {
            user.token = createToken(user.data.id)
        }
        res.status(200).json(user);
    }
}