import log4js from 'log4js';

import { addProductToCartService, buyService, getCartService } from '../services/cart.service.js';

const buyController = async (req, res) => {
    const response = await buyService(req, res);

    return res.redirect(response.redirect)
}

const getCartController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const response = await getCartService(req, res)

    return res.render('main', response);
};

const addProductToCartController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const response = await addProductToCartService(req, res);

    return res.render('main', response);
}

export {
    buyController,
    getCartController,
    addProductToCartController
}