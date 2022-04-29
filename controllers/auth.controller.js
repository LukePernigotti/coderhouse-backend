import { transporter, mailOptions } from "../ethereal.js";

const register = async (req, res, next) => {
    mailOptions.subject = 'New registry';
    mailOptions.html = `<h1>Welcome</h1>
    <ul>
        <li>${req.body.name}</li>
        <li>${req.body.age}</li>
        <li>${req.body.email}</li>
        <li>${req.body.address}</li>
        <li>${req.body.phone}</li>
    </ul>`;

    try {
        const mail = await transporter.sendMail(mailOptions);
        console.log('mail', mail);
    } catch (error) {
        console.log('error', error);
    }

    return res.redirect('/');
}
const login = async (req, res, next) => { 
    return res.redirect('/')
};

export {
    login,
    register,
}