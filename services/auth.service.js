const { transporter, mailOptions } = require('../ethereal.js');
const { STATUS } = require('../utils/constants/api.constants.js');
const CustomError = require('../utils/errors/CustomError.js');

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
        
        const response = {
            redirect: '/'
        }

        return response;
    } catch (error) {
        throw new CustomError(
            STATUS.INTERNAL_ERROR.code,
            `${STATUS.INTERNAL_ERROR.tag} ${error.message}`,
            error
        );
    }
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

module.exports = {
    getRegisterService, 
    postRegisterService, 
    getLoginService, 
    postLoginService 
}
