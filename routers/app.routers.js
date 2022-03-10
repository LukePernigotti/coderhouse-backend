import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { app } from '../app.js';
import { config } from '../db/config.js';
import productsRoutes from './api/products.routes.js';
import authRoutes from './api/auth/auth.routes.js';
import authMiddleware from '../middlewares/auth.js';
import passport from '../middlewares/passport.js';
import { products } from '../controllers/products.controller.js';

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


router.use('/api/products', productsRoutes);
router.use('/auth', authRoutes);

router.use(passport.initialize());
router.use(passport.session());


router.get('/', authMiddleware, async (req, res) => {
    return res.render('main', { body: '../pages/home', data: { name: 'req.session.name', products: await products.getAll() }});
})
  

router.get('/logout', authMiddleware, (req, res, next) => {
    req.session.destroy((err) => {
    if (err) {
        next(err);
    } else {
        res.clearCookie('coder-session');
        res.redirect('/');
    }
    });
});

export default router;