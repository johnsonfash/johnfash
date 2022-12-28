import dotenv from 'dotenv/config'
import { createConnection } from 'mysql2/promise'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
const algorithm = 'aes-256-cbc'
const { host, user, password, database, timezone, ACCESS_TOKEN, SECRET_KEY } = process.env;

const transporter = nodemailer.createTransport({
    host: 'dunamisbirmingham.org',
    port: 465,
    secure: true,
    auth: {
        user: 'info@dunamisbirmingham.org',
        pass: process.env.EMAIL_PASSWORD
    }
})

export const sendEmail = async ({ to, subject, html, text }) => {
    const message = {
        from: `Dunamisbirmingham <info@dunamisbirmingham.org>`,
        to,
        subject
    }
    if (text) {
        message.text = text
    } else {
        message.html = html
    }
    try {
        return await transporter.sendMail(message)
    } catch (error) {
        return false
    }
}


export const welcomeString = (name, username, password) => `<div style="background: #eff2f3; padding: 1rem; margin: 0">
<div style="text-align: center; padding: 2rem 1rem">
  <img src="https://dunamisgospel.org/newwebsite/wp-content/uploads/2021/11/digc_logo.png" alt="Dunamis Birmingham Logo" srcset="" />
</div>
<div
  style="
    padding: 1rem;
    background: white;
    margin: 0 1rem;
  "
>
  <h4>Hi, ${name}.</h4>
  <p>You have been added as an admin for <b>Dunamis Int'l Gospel Center <br/> Birmingham, Uk</b>.</p>
  <p>username is: <b>${username}</b></p>
  <p>password is: <b> ${password}</b></p>
  <br/>
  <p style="margin-bottom:2rem;">Make sure to change the password when you login for the first time!</p>
  <div style="text-align:center;">
  <a href="https://dunamisbirmingham.org/login" style="padding: 0.5rem 2rem; width: 100%; color: white; background: purple;">Login</a>
  <div>
  <br/>
</div>

<div style="text-align: center; margin: 1rem auto">
  <div>
    <a href="https://dunamisbirmingham.org" style="color: inherit"><b>Home</b></a>
    •
    <a href="https://dunamisbirmingham.org/#contact-us" style="color: inherit"><b>Contact</b></a>
  </div>
  <br />
  <p>220 Moseley Road, Birmingham B12 ODG, United Kingdom.</p>
</div>
</div>`

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

const generateString = (len = 8) => Array(len).fill(0).map(x => Math.random().toString(36).charAt(2)).join('')

const register = async (email, name) => {
    try {
        const mysql = await createConnection({ host, user, password, database });
        const [r] = await mysql.execute('SELECT `email` FROM `admin` WHERE `email` = ?', [email]);
        if (r?.length) return { error: true, errorMessage: 'user already exist', data: null }
        const pass = generateString();
        const pass_db = encrypt(pass)
        if (pass_db.error) return { error: true, errorMessage: 'unable to register admin!', data: null }
        const username = 'dunamis_' + generateString(6).toUpperCase();
        const [rows] = await mysql.execute('INSERT INTO `admin` (`email`,`name`,`username`,`password`) VALUES (?,?,?,?)', [email, name, username, pass_db.data]);
        mysql.end();
        if (rows) {
            const message = await sendEmail({ to: email, subject: 'New Admin for Dunamis Birmingham', html: welcomeString(name, username, pass) })
            if (message) {
                return { error: false, errorMessage: null, data: rows[0] };
            }
            return { error: true, errorMessage: 'unable to send email credentials to new admin', data: null };
        } else {
            return { error: true, errorMessage: "unable to add user, please try again!", data: null }
        }
    } catch (err) {
        return { error: true, errorMessage: err.message, data: null }
    }
}

const getAdmins = async () => {
    try {
        const mysql = await createConnection({ host, user, password, database });
        const [rows] = await mysql.execute('SELECT `email`, `name`, `username`, `date` FROM `admin`');
        mysql.end();
        return { error: false, errorMessage: null, data: rows };
    } catch (err) {
        return { error: true, errorMessage: err.message, data: null }
    }
}

export default async function handler(req, res) {
    const token = validToken(req)
    if (token.error) return res.status(401).json(token);
    if (req.method === 'POST') {
        const response = await register(req.body.email, req.body.name)
        res.status(200).json(response);
    }
    if (req.method === 'GET') {
        const admins = await getAdmins()
        res.status(200).json(admins);
    }
}