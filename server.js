const express = require('express');
const path = require('path');
const faker = require('faker');
const { httpServer, io, app } = require('./app');
const apiRoutes = require('./routers/app.routers');
const { products } = require('./controllers/products.controller');
const { initChatController } = require('./controllers/chat.controller');

const PORT = process.env.PORT || 8080;
faker.locale = 'en'

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views/layouts');

app.get('/', async (req, res) => {
    return res.render('main', { body: '../pages/home', data: { products: await products.getAll() }});
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
