const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    service: config.mailer.host,
    auth: {
        user: config.mailer.user,
        pass: config.mailer.pass,
    },
});

const sendMail = async (to, subject, text, html = '') => {
   const info = await transporter.sendMail({
       from: `yarikxan2@gmail.com`,
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
    return info.messageId;
};
module.exports = sendMail;
