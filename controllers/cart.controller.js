const log4js = require('log4js');

const { addProductToCartService, buyService, getCartService, updateCartService, deleteCartService } = require('../services/cart.service.js');

const buyController = async (req, res) => {
    try {
        const response = await buyService(req, res);
    
        return res.json(response);
    } catch (error) {
        return res.status(error.status).send(error.description);
    }
}

const getCartController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    try {
        const response = await getCartService(req, res)
    
        return res.json(response);
    } catch (error) {
        return res.status(error.status).send(error.description);
    }
};

const addProductToCartController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    try {
        const response = await addProductToCartService(req, res);
        
        return res.json(response);
    } catch (error) {
        return res.status(error.status).send(error.description);
    }
}

const updateCartController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    try {
        const response = await updateCartService(req, res)
    
        return res.json(response);
    } catch (error) {
        return res.status(error.status).send(error.description);
    }
}

const deleteCartController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    try {
        const response = await deleteCartService(req, res);
        return res.json(response);
    } catch (error) {        
        return res.status(error.status).send(error.description);
    }
}

module.exports = {
    buyController,
    getCartController,
    addProductToCartController,
    updateCartController,
    deleteCartController
}