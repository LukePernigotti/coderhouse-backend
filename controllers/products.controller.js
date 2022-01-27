const { ProductsApi } = require('../models/index');

const products = new ProductsApi();
const IS_ADMIN = false;

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
    if (!IS_ADMIN) return res.status(401).send({ error: 401, message: `Error 401. You are not authorized to access to path: ${req.route.path} using method: ${req.method}.`});
    const { title, description, price, stock, thumbnail, code } = req.body;
    
    if ( !title || !description || !price || !stock || !thumbnail || !code) {
        return res.status(400).send(`Body has a wrong format: ${JSON.stringify(req.body)}`)
    }
    
    const timestamp = Date.now();

    const response = await products.add({ title, description, price, stock, thumbnail, timestamp, code });

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const updateProductController = async (req, res) => {
    if (!IS_ADMIN) return res.status(401).send({ error: 401, message: `Error 401. You are not authorized to access to path: ${req.route.path} using method: ${req.method}.`});
    if ( !title && !description && !price && !stock && !thumbnail && !code) {
        return res.status(400).send(`Body doesn't have a title, description, price, stock, thumbnail or code: ${JSON.stringify(req.body)}`)
    }
    const response = await products.update(req.params.id, req.body);
    
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const deleteProductController = async (req, res) => {
    if (!IS_ADMIN) return res.status(401).send({ error: 401, message: `Error 401. You are not authorized to access to path: ${req.route.path} using method: ${req.method}.`});
    const response = await products.delete(req.params.id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

module.exports = {
    products,
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
    IS_ADMIN
}