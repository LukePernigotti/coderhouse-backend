const { ProductsApi } = require('../models/index');
const { io, httpServer, app } = require('../app');

const products = new ProductsApi();

const getProductsController = async (req, res) => {
    let response;
    if (req.params.id) {
        response = await products.get(req.params.id);
    } else {
        response = await products.getAll();
    }
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const addProductController = async (req, res) => {
    const { name, description, price, stock, thumbnail, code } = req.body;

    if ( !name || !description || !price || !stock || !thumbnail || !code) {
        return res.status(400).send(`Body has a wrong format: ${JSON.stringify(req.body)}`)
    }
    const timestamp = Date.now();

    const response = await products.add({ name, description, price, stock, thumbnail, timestamp, code });

    if (response.error) return res.status(404).send(response.error);

    io.sockets.emit('products-server:addProduct', response);
    return res.json(response);
};

const updateProductController = async (req, res) => {
    const { title, description, price, stock, thumbnail, code } = req.body;
    if (!title && !description && !price && !stock && !thumbnail && !code) {
        return res.status(400).send(`Body doesn't have a title, description, price, stock, thumbnail or code: ${JSON.stringify(req.body)}`)
    }
    const response = await products.update(req.params.id, req.body);
    
    if (response.error) return res.status(404).send(response.error);
    return res.json(response); // 0 or 1
};

const deleteProductController = async (req, res) => {
    const response = await products.delete(req.params.id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response); // 0 or 1
};

module.exports = {
    products,
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
}