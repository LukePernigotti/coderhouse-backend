const express = require('express');
const { completeOrderController } = require('../../controllers/orders.controller.js');

const router = express.Router();

/**
 * [POST] '/api/complete-order' Puts an order with the products added to the cart
 * params null
 * body null
 */
router.post('/complete-order', completeOrderController);

module.exports = router;