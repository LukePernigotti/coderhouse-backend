import express from 'express';
import { 
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} from '../../controllers/products.controller.js';

const productsRouter = express.Router();

productsRouter.get('/:id?', getProductsController);

productsRouter.post('/', addProductController);

productsRouter.put('/:id', updateProductController);

productsRouter.delete('/:id', deleteProductController);

export { productsRouter };