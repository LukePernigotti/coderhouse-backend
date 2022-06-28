const { createTransport } = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || 'josiane.hoppe48@ethereal.email';

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL_ADDRESS,
        pass: '8Z2qqMj4vp9nmqR54y'
    }
});

const mailOptions = {
    from: 'Coderhouse Ecommerce',
    to: EMAIL_ADDRESS,
    // subject: 'Subject Coderhouse Ecommerce',
    // html: '<h1>This is an email</h1>'
}

module.exports = { transporter, mailOptions };
