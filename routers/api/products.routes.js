import express from 'express';
import log4js from 'log4js';

import { 
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} from '../../controllers/products.controller.js';

const router = express.Router();

router.get('/:id?', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    getProductsController(req, res)
});

router.post('/', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    addProductController(req, res)
});

router.put('/:id', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    updateProductController(req, res);
});

router.delete('/:id', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    deleteProductController(req, res);
});

export default router;