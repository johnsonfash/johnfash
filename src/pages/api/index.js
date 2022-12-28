import dotenv from 'dotenv/config'
import nodemailer from 'nodemailer'
import Recaptcha from 'recaptcha-verify'

let recaptcha = new Recaptcha({
    secret: process.env.GOOGLE_SECRET,
    verbose: true
});

const capcha_url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SECRET}&response=`

const transporter = nodemailer.createTransport({
    host: 'dunamisbirmingham.org',
    port: 465,
    secure: true,
    auth: {
        user: 'info@dunamisbirmingham.org',
        pass: process.env.EMAIL_PASSWORD
    }
})

export const emailHealth = async () => {
    try {
        return await transporter.verify()
    } catch (error) {
        return false
    }
}

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

export const welcomeString = (name) => `<div style="background: #eff2f3; padding: 1rem; margin: 0">
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
  <p>Welcome to <b>Dunamis Int'l Gospel Center <br/> Birmingham, UK</b>.</p>
  <p>Thank you for <b>Joining us</b> today.</p>
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

export const notificationString = (name, email, phone) => `<div style="background: #eff2f3; padding: 1rem; margin: 0">
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
  <p>A new user just signed up to the mail list!</p>
  <h3>User information:</h3>
  <p>Name: ${name}</p>
  <p>Email: ${email}</p>
  <p>Phone: ${phone}</p>
</div>
<div style="text-align: center; margin: 1rem auto">
  <br />
  <p>220 Moseley Road, Birmingham B12 ODG, United Kingdom.</p>
</div>
</div>`


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const name = req.body.name;
        const to = req.body.email;
        const phone = req.body.phone;
        const capcha = req.body.capcha;
        const join = req.body.join;
        try {
            recaptcha.checkResponse(capcha, function (error, response) {
                if (error) {
                    return res.status(400).json({ error: true, status: 400, errorMessage: 'Invalid capcha response, please try again!' });
                }
                if (!response.success) {
                    return res.status(400).json({ error: true, status: 400, errorMessage: 'Invalid capcha response, please try again!' });
                }
            });
        } catch (err) {
            return res.status(400).json({ error: true, status: 400, errorMessage: 'Invalid capcha response, please try again!' });
        }
        const message = await sendEmail({ to, subject: 'Welcome to Dunamis Birmingham', html: welcomeString(name) })
        await sendEmail({ to: 'info@dunamisbirmingham.org', subject: 'New user added to mail list', html: notificationString(name, to, phone) })
        if (message) {
            return res.status(200).json({ error: false, status: 200, errorMessage: 'Message sent successfully!' });
        } else {
            return res.status(400).json({ error: true, status: 400, errorMessage: 'Unable to send email!' });
        }
    }
}