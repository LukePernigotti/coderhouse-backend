const log4js = require('log4js');

const { 
    addProductService,
    getCategoryService,
    deleteProductService, 
    getProductsService, 
    updateProductService,
    products
} = require('../services/products.service.js');


const getProductsController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    try {
        const response = await getProductsService(req, res);
        return res.json(response);
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        return res.status(error.status).send(error.description);
    }
};

const getCategoryController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    try {
        const response = await getCategoryService(req, res);
        return res.json(response);
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        return res.status(error.status).send(error.description);
    }
};

const addProductController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    try {
        const response = await addProductService(req, res);
        return res.json(response);
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        return res.status(error.status).send(error.description);
    }
};

const updateProductController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    try {
        const response = await updateProductService(req, res);
        return res.json(response);
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        return res.status(error.status).send(error.description);
    }
};

const deleteProductController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    try {
        const response = await deleteProductService(req, res);
        return res.json(response);
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        return res.status(error.status).send(error.description);
    }
};

module.exports = {
    products,
    getProductsController,
    getCategoryController,
    addProductController,
    updateProductController,
    deleteProductController,
}