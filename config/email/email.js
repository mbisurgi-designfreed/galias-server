const nodemailer = require('nodemailer');

const smtpConfig = {
    host: 'ci2.toservers.com',
    port: 587,
    secure: false,
    auth: {
        user: 'pedidos@galia.com.ar',
        pass: 'Galia2018'
    }
};

module.exports =  nodemailer.createTransport(smtpConfig);