const express = require('express');
const router = express.Router();

const { 
    getAllProductsController,
    getProductByIdController,
    addProductController,
    updateProductByIdController,
    deleteProductByIdController
} = require('../../controllers/products.controller');

router.get('/', getAllProductsController);

router.get('/:id', getProductByIdController);

router.post('/', addProductController);

router.put('/:id', updateProductByIdController);

router.delete('/:id', deleteProductByIdController);

module.exports = router;