const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { app } = require('../app.js');
const { config } = require('../db/config.js');
const cartRoutes = require('./api/cart.routes.js');
const productsRoutes = require('./api/products.routes.js');
const ordersRoutes = require('./api/orders.routes.js');
const authRoutes = require('./auth/auth.routes.js');
const authMiddleware = require('../middlewares/auth.js');
const passport = require('../middlewares/passport.js');
const { getInfoController, getRootController, logoutController } = require('../controllers/root.controller.js');

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
router.use('/api/', ordersRoutes);
router.use('/auth', authRoutes);

router.use(passport.initialize());
router.use(passport.session());


router.get('/', authMiddleware, getRootController);

router.get('/info', getInfoController);

router.get('/logout', authMiddleware, logoutController);

module.exports = router;