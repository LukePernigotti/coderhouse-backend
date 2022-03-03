import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import faker from 'faker';
import { fileURLToPath } from 'url';

import { webAuth } from './auth/index.js'
import { config } from './db/config.js';
import { httpServer, io, app } from './app.js';
import routes from './routers/app.routers.js';
import { products } from './controllers/products.controller.js';
import { initChatController } from './controllers/chat.controller.js';

const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
faker.locale = 'en'

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('./public'));

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoAtlas.uri }),
    secret: 'secret-123456',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1/*Y*/ * 1/*h*/ * 10/*m*/ * 60/*s*/ * 1000/*ms*/
    }
}))

app.set('view engine', 'ejs');
app.set('views', './views/layouts');

app.get('/', webAuth, async (req, res) => {
    return res.render('main', { body: '../pages/home', data: { name: req.session.name, products: await products.getAll() }});
})

// login & logout
app.get('/login', (req, res) => {
    const name = req.session?.name
    if (name) {
        res.redirect('/')
    } else {
        return res.render('main', { body: '../pages/login', data: { name }});
    }
})

app.get('/logout', (req, res) => {
    const name = req.session?.name
    if (name) {
        req.session.destroy(err => {
            if (!err) {
                return res.render('main', { body: '../pages/logout', data: { name }});
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

app.post('/login', (req, res) => {
    req.session.name = req.body.name
    res.redirect('/')
})

// faker
app.get('/api/products-test', (req, res) => {
    const productsQuantity = 5
    const products = []

    for (let i = 1; i <= productsQuantity; i++) {
        const product = {
            id: i,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: `${faker.image.imageUrl()}?${i}`
        }
        products.push(product)
    }

    return res.render('main', { body: '../pages/products', data: { products }});
})

app.use((req, res) => {
    res.status(404).send({ error: 404, message: `Error 404. The path ${req.originalUrl} using method ${req.method} is not implemented.`});
});

httpServer.listen(PORT, () => console.log(`Server ON - Port: ${PORT}`));

httpServer.on('error', (error) => {
    console.log(error.message);
})

io.on('connection', initChatController);
