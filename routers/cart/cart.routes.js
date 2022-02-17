import express from 'express';
import {
    createCartController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController,
} from '../../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.get('/', createCartController);

cartRouter.delete('/:id', deleteCartController);

cartRouter.get('/:id/products', getCartController);

cartRouter.post('/:id/products', addProductController);

cartRouter.delete('/:id/products/:id_prod', removeProductController);

export { cartRouter };