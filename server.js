import express from 'express';
import path from 'path';
import faker from 'faker';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import flash from 'connect-flash';

import { config } from './db/config.js';
import { httpServer, io, app } from './app.js';
import router from './routers/app.routers.js';
import { initChatController } from './controllers/chat.controller.js';

const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
faker.locale = 'en'

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(flash());

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views/layouts');

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

httpServer.listen(PORT, async () => {
    mongoose.connect(config.mongodb.connectTo('ecommerce'))
    .then(() => {
      console.log('Connected to DB!');
      console.log('Server is up and running on port: ', +PORT);
    });
});

httpServer.on('error', (error) => {
    console.log(error.message);
})

io.on('connection', initChatController);
