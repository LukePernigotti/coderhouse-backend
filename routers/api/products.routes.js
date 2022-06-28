const express = require('express');

const { 
    getProductsController,
    getCategoryController,
    addProductController,
    updateProductController,
    deleteProductController
} = require('../../controllers/products.controller.js');

const router = express.Router();

/**
 * [GET] '/api/products/' Get an array of products
 * params nulll
 * body null
 */
router.get('/', getProductsController);

/**
 * [GET] '/api/products/:category' Get an array of products
 * params null
 * body null
 */
router.get('/:category', getCategoryController);

/**
 * [POST] '/api/products/' Saves a product into the DB
 * params null
 * body {string} name
 * body {string} description
 * body {number} price
 * body {number} stock
 * body {string} thumbnail
 * body {string} category
 */
router.post('/', addProductController);

/**
 * [PUT] '/api/products/:id' Get an array of products
 * params id - ID of the product
 * body {string} name
 * body {string} description
 * body {number} price
 * body {number} stock
 * body {string} thumbnail
 * body {string} category
 */
router.put('/:id', updateProductController);

/**
 * [DELETE] '/api/products/:id' Get an array of products
 * params id - ID of the product
 * body null
 */
router.delete('/:id', deleteProductController);

module.exports = router;