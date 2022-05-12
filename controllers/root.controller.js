import log4js from 'log4js';

import { getInfoService, getRootService } from '../services/root.service.js';

const getRootController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const response = await getRootService(req, res);

    return res.render('main', response);
}

const getInfoController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = await getInfoService(req, res);
    return res.render('main', response);
}

const logoutController = (req, res, next) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    req.session.destroy((err) => {
        if (err) {
            next(err);
        } else {
            res.clearCookie('coder-session');
            res.redirect('/');
        }
    });
}

export { 
    getRootController,
    getInfoController,
    logoutController
}