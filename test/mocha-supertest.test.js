const express = require('express');
const supertest = require('supertest');
const { expect } = require('chai');
const { describe } = require('mocha');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const { httpServer, app, args } = require('../app.js');
const { config } = require('../db/config.js');
const router = require('../routers/app.routers.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(flash());

let req;
let server;

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.connectTo('ecommerce'))
        .then(() => {
            console.log('Connected to DB!');
        });
    } catch (error) {
        throw new Error('Error connecting to DB => ', error);
    }
}

const startServer = async () => {
    return await new Promise((resolve, reject) => {
        const PORT = 8080 ;
        server = httpServer.listen(PORT, () => {
            console.log(`Server is up and running on port ${server.address().port}`);
            resolve(server);
        })

        server.on('error', (error) => {
            console.log(error);
            reject(error);
        })
    })
}

describe('Products API test', async function() {
    this.timeout(5000);
    before(async () => {
        const db = await connectDB();
        server = await startServer();
        req = supertest(`http://localhost:${server.address().port}/api/products`);
    })

    after(() => {
        mongoose.disconnect();
        server.close();
    })

    it('Should get a 200 response', async () => {
        const response = await req.get('/');
        expect(response.status).to.eql(200);
    })

    it('Should get more than 0 products', async () => {
        const response = await req.get('/');
        expect(response.body.length).to.be.greaterThan(0);
    })

    let addedProductId = '';
    const product = {
        name: 'Wheel Cylinder39',
        description: 'This is a wheel cylinder',
        price: 944,
        stock: 45,
        thumbnail: '/images/wheel-cylinder.webp',
        code: 'C-0039',
    }

    it('Should add a product', async () => {
        const response = await req.post('/').send(product);
        addedProductId = response.body._id;
        product._id = addedProductId;
        
        expect(response.body).to.include(product);
    })
    
    it('Should get a product with the right format', async () => {
        const response = await req.get(`/${addedProductId}`);
        expect(response.body).to.include.keys('name', 'description', 'price', 'stock', 'thumbnail', 'code');
    })
    
    it('Should update a product', async () => {
        const response = await req.put(`/${addedProductId}`).send({ price: 1000 });
        expect(response.body).to.include({ acknowledged: true, matchedCount: 1 });
    })
    
    it('Should delete a product', async () => {
        const response = await req.delete(`/${addedProductId}`);
        expect(response.body).to.include(product);
    })
})
