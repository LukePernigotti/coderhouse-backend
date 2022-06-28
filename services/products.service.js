const { io } = require('../app.js');
const { ProductsApi } = require('../models/index.js');
const { STATUS } = require('../utils/constants/api.constants.js');
const CustomError = require('../utils/errors/CustomError.js');

const products = new ProductsApi();

const getProductsService = async (req, res) => {
    const response = await products.getAll();
    
    return response;
};

const getCategoryService = async (req, res) => {
    const response = await products.getAll({ category: req.params.category });
    
    return response;
};

// const getProductService = async (req, res) => {
//     let response;
//     if (req.params.id) {
//         response = await products.getById(req.params.id);
//     } else {
//         response = await products.getAll();
//     }
    
//     return response;
// };

const addProductService = async (req, res) => {
    const { name, description, price, stock, thumbnail, category } = req.body;
    
    if (!name && !description && !price && !stock && !thumbnail && !category) {
        throw new CustomError(
            STATUS.BAD_REQUEST.code,
            `${STATUS.BAD_REQUEST.tag} Body has a wrong format. One of the following arguments is missing: name, description, price, thumbnail, stock or category.`
        );
    }
    
    const timestamp = Date.now();

    const response = await products.add({ name, description, price, stock, thumbnail, timestamp, category });

    io.sockets.emit('products-server:addProduct', response);
    return response;
}

const updateProductService = async (req, res) => {
    const { name, description, price, stock, thumbnail, category } = req.body;
    
    if (!name && !description && !price && !stock && !thumbnail && !category) {
        throw new CustomError(
            STATUS.BAD_REQUEST.code,
            `${STATUS.BAD_REQUEST.tag} Body has a wrong format. There should be at least one of the following arguments: name, description, price, thumbnail, stock or category.`
        );
    }

    const response = await products.updateById(req.params.id, req.body);

    return response;
};

const deleteProductService = async (req, res) => {
    const response = await products.deleteById(req.params.id);

    return response;
};

module.exports = {
    getProductsService,
    getCategoryService,
    addProductService,
    updateProductService,
    deleteProductService,
    products
}