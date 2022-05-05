import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { app } from '../app.js';
import { config } from '../db/config.js';
import cartRoutes from './api/cart.routes.js';
import productsRoutes from './api/products.routes.js';
import authRoutes from './api/auth/auth.routes.js';
import randomRoutes from './api/random/random.routes.js';
import authMiddleware from '../middlewares/auth.js';
import passport from '../middlewares/passport.js';
import { getInfoController, getRootController, logoutController } from '../controllers/root.controller.js';

const router = express.Router();

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: config.mongodb.connectTo('sessions')
    }),
    name: 'coder-session',
    secret: 'secret-123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1/*Y*/ * 1/*h*/ * 10/*m*/ * 60/*s*/ * 1000/*ms*/
    }
}))


router.use('/api/cart', cartRoutes);
router.use('/api/products', productsRoutes);
router.use('/api/random', randomRoutes);
router.use('/auth', authRoutes);

router.use(passport.initialize());
router.use(passport.session());


router.get('/', authMiddleware, getRootController);

router.get('/info', getInfoController);

router.get('/logout', authMiddleware, logoutController);

export default router;