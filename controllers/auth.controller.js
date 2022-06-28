const log4js = require('log4js');

const { getLoginService, getRegisterService, postLoginService, postRegisterService } = require('../services/auth.service.js');

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

    try {
        const response = await postRegisterService(req, res)
        return res.redirect(response.redirect);
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        return res.status(error.status).send(error.description);
    }
}

const getLoginController = (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = getLoginService(req, res);

    if (response.redirect) return res.redirect(response.redirect)
    return res.render('main.ejs', response);
}

const postLoginController = (req, res, next) => { 
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = postLoginService(req, res)

    return res.redirect(response.redirect);
};

module.exports = {
    getLoginController,
    postLoginController,
    postRegisterController,
    getRegisterController,
}