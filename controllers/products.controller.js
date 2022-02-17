import { productsDao } from '../models/index.js';

// const IS_ADMIN = true;

const getProductsController = async (req, res) => {
    let response;
    if (req.params.id) {
        response = await productsDao.get(req.params.id);
    } else {
        response = await productsDao.getAll();
    }
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const addProductController = async (req, res) => {
    console.log('addProductController req.body', req.body);
    const { name, description, price, stock, thumbnail, code } = req.body;

    if ( !name || !description || !price || !stock || !thumbnail || !code) {
        return res.status(400).send(`Body has a wrong format: ${JSON.stringify(req.body)}`)
    }
    const timestamp = Date.now();

    const response = await productsDao.add({ name, description, price, stock, thumbnail, timestamp, code });

    if (response.error) return res.status(404).send(response.error);

    // io.sockets.emit('products-server:addProduct', response);
    return res.json(response);
};

const updateProductController = async (req, res) => {
    const { name, description, price, stock, thumbnail, code } = req.body;
    if (!name && !description && !price && !stock && !thumbnail && !code) {
        return res.status(400).send(`Body doesn't have a name, description, price, stock, thumbnail or code: ${JSON.stringify(req.body)}`)
    }
    const response = await productsDao.update(req.params.id, req.body);
    
    if (response.error) return res.status(404).send(response.error);
    return res.json(response); // 0 or 1
};

const deleteProductController = async (req, res) => {
    // if (!IS_ADMIN) return res.status(401).send({ error: 401, message: `Error 401. You are not authorized to access to path: ${req.originalUrl} using method: ${req.method}.`});
    const response = await productsDao.delete(req.params.id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response); // 0 or 1
};

export {
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
};