import log4js from 'log4js';

import { getLoginService, getRegisterService, postLoginService, postRegisterService } from '../services/auth.service.js';

const getRegisterController = (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const response = getRegisterService(req, res);

    if (response.redirect) return res.redirect(response.redirect)
    return res.render('main', response);
}

const postRegisterController = async (req, res, next) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = await postRegisterService(req, res)

    return res.redirect(response.redirect);
}

const getLoginController = (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = getLoginService(req, res);

    if (response.redirect) return res.redirect(response.redirect)
    return res.render('main', response);
}

const postLoginController = (req, res, next) => { 
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = postLoginService(req, res)

    return res.redirect(response.redirect);
};

export {
    getLoginController,
    postLoginController,
    postRegisterController,
    getRegisterController,
}