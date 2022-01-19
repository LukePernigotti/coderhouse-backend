const { ProductsApi } = require('../models/index');

const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const products = new ProductsApi();
const chatMessagesArray = [];

const getAllProductsController = (req, res) => {
    const response = products.getAll();
    if (response.error) return res.status(404).send(response.error);
    return res.render('main', { body: '../pages/products', data: { products: response }});
};

const getProductByIdController = (req, res) => {
    const response = products.getById(req.params.id);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const addProductController = (req, res) => {
    const { title, price, thumbnail } = req.body;
    
    if ( !title || !price || !thumbnail) {
        return res.status(400).send(`El cuerpo tiene un formato incorrecto: ${req.body}`)
    }

    const product = products.add({ title, price, thumbnail });

    io.sockets.emit('products-server:addProduct', product);

    return res.render('main', { 
        body: '../pages/home', 
        data: { 
            success: true, 
            products: products.getAll(), 
            chatMessagesArray 
        }
    });
};

const updateProductByIdController = (req, res) => {
    const response = products.updateById(req.params.id, req.body);
    
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const deleteProductByIdController = (req, res) => {
    const response = products.deleteById(req.params.id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

module.exports = {
    products,
    getAllProductsController,
    getProductByIdController,
    addProductController,
    updateProductByIdController,
    deleteProductByIdController,
    app,
    io,
    httpServer,
    chatMessagesArray
}