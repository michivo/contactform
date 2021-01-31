# Contact Form
This is a simple contact form for demonstration purposes. It includes a small server application written in Node.js/Express.js, so you need to install Node first.

# Prerequisites
A current version of Node.js will do, I guess anything after Node.js 12 will be just fine. 

If you want to use Google reCAPTCHA v3 to protect your contact form against spam, just [get a key pair](https://g.co/recaptcha/v3) for your site.

You need some environment to run your server. Google's App Engine Standard has a free tier that will provide sufficient resources to power your application. If you do so, you will need Google's Cloud SDK on your machine. A sample configuration is part of this repository. You will then need to create a new Node.js App in the App Engine's Standard Environment, you will find plenty of tutorials and documentation of how to do that.

# How to run the server
If you want to run the server *without* reCAPTCHA, you only need to provide credentials for your mail server. You need to enter these values in server/mailer.js for running the server locally. You can also set these values through environment variables in your app.yaml when running the service in Google's App Engine. In server/mailer.js, you should also set a *redirect URL* for your contact form. That's the URL that the user will be redirected to after sending a message to you through your contact form.

If you want to run the server *with* reCAPTCHA, you also need to provide your site *Secret Key* in server/captchaverify.js (and the app.yaml). There are two sample HTML files for the client side in the **client**-Folder, one with and one without reCAPTCHA. If you want to use reCAPTCHA, you need to provide your *Site Key* in client/withrecaptcha.html . Please also comment our or delete the line defining the route without reCAPTCHA in index.js (`app.post('/sendmail', mailer);` => `// app.post('/sendmail', mailer);`)

The routes for your contact form will be `/sendmail` and `/sendmailrecaptcha`. The `/`-route serves as a health route and will return `Hello World` if you open it.
