
import { io } from '../app.js';
import { ProductsApi } from '../models/index.js';
import { STATUS } from '../constants/api.constants.js';

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
    let response = {};
    const { name, description, price, stock, thumbnail, code } = req.body;

    if ( !name || !description || !price || !stock || !thumbnail || !code) {
        response = {
            error: true,
            statusTag: STATUS.BAD_REQUEST.tag,
            statusCode: STATUS.BAD_REQUEST.code,
            message: `Body has a wrong format: ${JSON.stringify(req.body)}`,
        }

        return response;
    }
    const timestamp = Date.now();

    response.product = await products.add({ name, description, price, stock, thumbnail, timestamp, code });

    if (response.product.error) {
        response.error = true;
        response.statusCode = STATUS.INTERNAL_ERROR.code;
        response.statusTag = STATUS.INTERNAL_ERROR.tag;
        response.message = response.product.error;

        return response;
    }

    io.sockets.emit('products-server:addProduct', response.product);
    return response;
}

const updateProductService = async (req, res) => {
    const response = {};
    const { title, description, price, stock, thumbnail, code } = req.body;
    if (!title && !description && !price && !stock && !thumbnail && !code) {
        response.error = true;
        response.statusCode = STATUS.BAD_REQUEST.code;
        response.statusTag = STATUS.BAD_REQUEST.tag;
        response.message = `Body doesn't have a title, description, price, stock, thumbnail or code: ${JSON.stringify(req.body)}`;

        return response;
    }

    response.product = await products.updateById(req.params.id, req.body);
    
    if (response.product.error) {
        response.error = true;
        response.statusCode = STATUS.INTERNAL_ERROR.code;
        response.statusTag = STATUS.INTERNAL_ERROR.tag;
        response.message = response.product.error;
    }

    return response;
};

const deleteProductService = async (req, res) => {
    const response = {};
    response.product = await products.deleteById(req.params.id);

    if (response.product.error) {
        response.error = true;
        response.statusCode = STATUS.INTERNAL_ERROR.code;
        response.statusTag = STATUS.INTERNAL_ERROR.tag;
        response.message = response.product.error;    
    }

    return response;
};

export {
    getProductsService,
    addProductService,
    updateProductService,
    deleteProductService,
    products
}