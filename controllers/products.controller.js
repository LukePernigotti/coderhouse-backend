import log4js from 'log4js';

import { 
    addProductService, 
    deleteProductService, 
    getProductsService, 
    updateProductService,
    products
} from '../services/products.service.js';


const getProductsController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = await getProductsService(req, res);

    if (response.error) {
        const logger = log4js.getLogger('default');
        logger.error(response.error);
        
        return res.status(404).send(response.error);
    }

    return res.json(response);
};

const addProductController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = await addProductService(req, res);
    
    if (response.error) {
        const logger = log4js.getLogger('default');
        logger.error(response.message);

        return res.status(response.statusCode).send(response.message);
    }

    return res.json(response.products);
};

const updateProductController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const response = await updateProductService(req, res);
    
    if (response.error) {
        const logger = log4js.getLogger('default');
        logger.error(response.message);
        return res.status(response.statusCode).send(response.message);
    }
    return res.json(response.products);
};

const deleteProductController = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = await deleteProductService(req, res);

    if (response.error) {
        const logger = log4js.getLogger('default');
        logger.error(response.message);

        return res.status(response.statusCode).send(response.message);
    }

    return res.json(response.product);
};

export {
    products,
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
}