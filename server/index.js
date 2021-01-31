'use strict';
const express = require('express');
const cors = require('cors');
const captchaVerify = require('./captchaverify');
const mailer = require('./mailer');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.options('*', cors());

/* a simple health route */
app.get('/', (req, res) => {
    res.status(200).send('Hello, world!').end();
});

// app.post('/sendmail', mailer);

app.post('/sendmailrecaptcha', captchaVerify, mailer);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;