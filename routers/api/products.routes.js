import express from 'express';

import { 
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} from '../../controllers/products.controller.js';

const router = express.Router();

router.get('/:id?', getProductsController);

router.post('/', addProductController);

router.put('/:id', updateProductController);

router.delete('/:id', deleteProductController);

export default router;