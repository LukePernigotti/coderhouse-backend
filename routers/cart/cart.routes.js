const express = require('express');
const router = express.Router();

const { 
    createCartController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController,
} = require('../../controllers/cart.controller');

router.post('/', createCartController);

router.delete('/:id', deleteCartController);

router.get('/:id/products', getCartController);

router.post('/:id/products', addProductController);

router.delete('/:id/products/:id_prod', removeProductController);

module.exports = router;