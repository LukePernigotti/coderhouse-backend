import Router from 'koa-router';
import productsRoutes from './api/products.routes.js';

import { getRootController } from '../controllers/root.controller.js';

const router = new Router();

router.use('/api/products', productsRoutes.routes());
router.get('/', getRootController);

export default router;