import express from 'express';
import { productsRouter } from './products/products.routes.js';
import { cartRouter } from './cart/cart.routes.js';

const router = express.Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);

export { router };