const nodemailer = require('nodemailer');

// this line should then look like this:
// const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_HOST = process.env.SMTP_HOST || 'TODO - provide your smtp server address, e.g. smtp.office365.com';
const SMTP_USER = process.env.SMTP_USER || 'TODO - your email address, e.g. vorname.nachname@edu.campus02.at';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'TODO - your password';
const REDIRECT_URL = process.env.REDIRECT_URL || 'TODO - the redirect URL the user should be redirected to after sending the mail, e.g. https://michivo.github.io/mypage/messagesent.html';

const mailer = (req, res, next) => {

    const mailer = nodemailer.createTransport({
        host: SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD
        }
    });

    mailer.sendMail({
        from: SMTP_USER,
        to: SMTP_USER,
        subject: `Kontaktformular - Nachricht mit Titel ${req.body.title} von ${req.body.username} (${req.body.mail})`,
        text: req.body.message
    }, (err, _) => {
        if (err) {
            console.log('Error sending mail: ' + err);
            next(err);
        } else if(REDIRECT_URL) {
            res.redirect(REDIRECT_URL);
        }
        res.status(200).end();
    });
};

module.exports = mailer;