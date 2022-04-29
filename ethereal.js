import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

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

export { transporter, mailOptions };
