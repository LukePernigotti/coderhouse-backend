import express from 'express';
import { buyController, getCartController, addProductToCartController } from '../../controllers/cart.controller.js';

const router = express.Router();

router.post('/buy', buyController);

router.get('/', getCartController);

router.post('/:id', addProductToCartController)

export default router;