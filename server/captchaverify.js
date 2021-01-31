const fetch = require('isomorphic-fetch');

const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY || 'TODO: provide your secret google recaptcha key';

const captchaVerify = (req, res, next) => {
    const secret_key = RECAPTCHA_KEY;
    const token = req.body['g-recaptcha-response'];
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;


    fetch(url, { method: 'post' })
        .then(response => response.json())
        .then(google_response => {
            if (google_response.success) {
                next();
            } else {
                console.log('Captcha verification failed!');
                const err = new Error('Captcha verification failed!');
                res.status(403);
                next(err);
            }
        });
};

module.exports = captchaVerify;