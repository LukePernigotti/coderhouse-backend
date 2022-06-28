const { CartsApi } = require('../models/index.js');
const CustomError = require('../utils/errors/CustomError.js');
const { STATUS } = require('../utils/constants/api.constants.js');

const cart = new CartsApi();

const getCartService = async (req, res) => {
    if (!req.user) {
        throw new CustomError(
            STATUS.UNAUTHORIZED.code,
            `${STATUS.UNAUTHORIZED.tag} Can't access to a cart because you are not logged.`
        );
    }

    const response = await cart.getById(req.user._id);
    
    return response;
};

const addProductToCartService = async (req, res) => {
    if (!req.user) {
        throw new CustomError(
            STATUS.UNAUTHORIZED.code,
            `${STATUS.UNAUTHORIZED.tag} Can't access to a cart because you are not logged.`
        );
    }

    const productAdded = await cart.add(req.user._id, req.params.id);
    const response = await cart.getById(req.user._id);
    
    return response;
}

const updateCartService = async (req, res) => {
    const response = await cart.updateById(req.params.id, req.body);

    return response;
}

const deleteCartService = async (req, res) => {
    const response = await cart.deleteById(req.params.id);
    
    return response;
}

module.exports = {
    getCartService,
    addProductToCartService,
    updateCartService,
    deleteCartService,
}