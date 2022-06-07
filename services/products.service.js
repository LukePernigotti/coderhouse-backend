import { io } from '../app.js';
import { ProductsApi } from '../models/index.js';
import { STATUS } from '../utils/constants/api.constants.js';
import CustomError from '../utils/errors/CustomError.js';

const products = new ProductsApi();

const getProductsService = async (ctx) => {
    let response;
    try {
        if (ctx.request.params.id) {
            response = await products.getById(ctx.request.params.id);
        } else {
            response = await products.getAll();
        }
    } catch (error) {
        throw new CustomError(
            error.status,
            `${error.description}.`
        );
    }

    return response;
};

const addProductService = async (ctx) => {
    const { name, description, price, stock, thumbnail, code } = ctx.request.body;
    
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

const updateProductService = async (ctx) => {
    const { name, description, price, stock, thumbnail, code } = ctx.request.body;
    
    if (!name && !description && !price && !stock && !thumbnail && !code) {
        throw new CustomError(
            STATUS.BAD_REQUEST.code,
            `${STATUS.BAD_REQUEST.tag} Body has a wrong format. There should be at least one of the following arguments: name, description, price, thumbnail, stock or code.`
        );
    }

    const response = await products.updateById(ctx.request.params.id, ctx.request.body);

    return response;
};

const deleteProductService = async (ctx) => {
    const response = await products.deleteById(ctx.request.params.id);

    return response;
};

export {
    getProductsService,
    addProductService,
    updateProductService,
    deleteProductService,
    products
}