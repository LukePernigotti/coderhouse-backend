import log4js from 'log4js';

import { 
    addProductService, 
    deleteProductService, 
    getProductsService, 
    updateProductService,
    products
} from '../services/products.service.js';


const getProductsController = async (ctx) => {
    console.log('getProductsController');
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${ctx.req.originalUrl} using method ${ctx.req.method}.`);

    try {
        const response = await getProductsService(ctx);
        ctx.body= {
            success: true,
            data: response
        };
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);

        ctx.body = {
            success: false,
            message: error.description
        };
        ctx.status = error.status;
    }
};

const addProductController = async (ctx) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${ctx.req.originalUrl} using method ${ctx.req.method}.`);

    try {
        const response = await addProductService(ctx);
        ctx.body= {
            success: true,
            data: response
        };
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        ctx.body = {
            success: false,
            message: error.description
        };
        
        ctx.status = error.status;
    }
};

const updateProductController = async (ctx) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${ctx.req.originalUrl} using method ${ctx.req.method}.`);
    
    try {
        const response = await updateProductService(ctx);
        ctx.body= {
            success: true,
            data: response
        };
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        ctx.body = {
            success: false,
            message: error.description
        };
        ctx.status = error.status;
    }
};

const deleteProductController = async (ctx) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${ctx.req.originalUrl} using method ${ctx.req.method}.`);

    try {
        const response = await deleteProductService(ctx);
        ctx.body= {
            success: true,
            data: response
        };
    } catch (error) {
        const logger = log4js.getLogger('default');
        logger.error(error.description);
        
        ctx.body = {
            success: false,
            message: error.description
        };
        ctx.status = error.status;
    }
};

export {
    products,
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
}