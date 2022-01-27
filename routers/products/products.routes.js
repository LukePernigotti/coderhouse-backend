const express = require('express');
const router = express.Router();

const {
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} = require('../../controllers/products.controller');

router.get('/:id?', getProductsController);

router.post('/', addProductController);

router.put('/:id', updateProductController);

router.delete('/:id', deleteProductController);

module.exports = router;