import { io } from '../app.js';
import { ProductsApi } from '../models/index.js';
import { STATUS } from '../utils/constants/api.constants.js';
import CustomError from '../utils/errors/CustomError.js';

const products = new ProductsApi();

const getProductsService = async (req, res) => {
    let response;
    if (req.params.id) {
        response = await products.getById(req.params.id);
    } else {
        response = await products.getAll();
    }
    
    return response;
};

const addProductService = async (req, res) => {
    const { name, description, price, stock, thumbnail, code } = req.body;
    
    if (!name && !description && !price && !stock && !thumbnail && !code) {
        throw new CustomError(
            STATUS.BAD_REQUEST.code,
            `${STATUS.BAD_REQUEST.tag} Body has a wrong format. One of the following arguments is missing: name, description, price, thumbnail, stock or code.`
        );
    }
    
    const timestamp = Date.now();

    const response = await products.add({ name, description, price, stock, thumbnail, timestamp, code });

    io.sockets.emit('products-server:addProduct', response);
    return response;
}

const updateProductService = async (req, res) => {
    const { name, description, price, stock, thumbnail, code } = req.body;
    
    if (!name && !description && !price && !stock && !thumbnail && !code) {
        throw new CustomError(
            STATUS.BAD_REQUEST.code,
            `${STATUS.BAD_REQUEST.tag} Body has a wrong format. There should be at least one of the following arguments: name, description, price, thumbnail, stock or code.`
        );
    }

    const response = await products.updateById(req.params.id, req.body);

    return response;
};

const deleteProductService = async (req, res) => {
    const response = await products.deleteById(req.params.id);

    return response;
};

export {
    getProductsService,
    addProductService,
    updateProductService,
    deleteProductService,
    products
}