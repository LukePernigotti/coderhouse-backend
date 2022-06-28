const express = require('express');
const { buyController, getCartController, addProductToCartController, updateCartController, deleteCartController } = require('../../controllers/cart.controller.js');

const router = express.Router();

/**
 * [POST] '/api/cart/buy' Buy products added in the cart
 * params null
 * body null
 */
router.post('/buy', buyController);

/**
 * [GET] '/api/cart/' Get cart
 * params null
 * body null
 */
router.get('/', getCartController);

/**
 * [POST] '/api/cart/' Buy products added in the cart
 * params id - ID of the product
 * body null
 */
router.post('/:id', addProductToCartController)

router.put('/:id', updateCartController);

/**
 * [DELETE] '/api/cart/:id' Delete cart
 * params id - ID of the cart
 * body null
 */
router.delete('/:id', deleteCartController);

module.exports = router;