import express from 'express';
import productsRoutes from './api/products.routes.js';

const router = express.Router();

router.use('/api/products', productsRoutes);

export default router;