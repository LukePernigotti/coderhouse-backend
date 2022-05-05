import { transporter, mailOptions } from "../ethereal.js";

const getRegisterService = (req, res) => {
    const response = {}
    if (req.isAuthenticated()) {
        response.redirect = '/';
        return response;
    }
    
    response.body = '../pages/register';
    return response;
}

const postRegisterService = async (req, res) => {
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

    const response = {
        redirect: '/'
    }

    return response;
}

const getLoginService = (req, res) => {
    const response = {}
    if (req.isAuthenticated()) {
        response.redirect = '/';
        return response;
    }
    
    response.body = '../pages/login';
    return response;
}

const postLoginService = (req, res) => {
    const response = {
        redirect: '/'
    }
    return response;
}

export { 
    getRegisterService, 
    postRegisterService, 
    getLoginService, 
    postLoginService 
}
