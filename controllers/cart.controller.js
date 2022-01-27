const { CartApi } = require('../models/index');

const cart = new CartApi();

const createCartController = async (req, res) => {
    const response = await cart.createCart();
    if (response.error) return res.status(404).send(response.error);
    return res.json({ id: response });
};

const deleteCartController = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).send(`id is missing from body: ${req.body}`);
    const response = await cart.deleteCart(id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const getCartController = async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).send(`id is missing from body: ${req.body}`);
    
    const response = await cart.getCart(id);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const addProductController = async (req, res) => {
    const { id: cartId } = req.params;
    const { productId } = req.body;
    if (!cartId && !productId) 
        return res.status(400).send(`Cart id or/and product id missing from body or params.`);
    
    const response = await cart.addProduct(cartId, productId);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const removeProductController = async (req, res) => {
    const { id: cartId, id_prod: productId } = req.params;

    if (!cartId || !productId) 
        return res.status(400).send(`Cart id or/and product id missing from params.`);

    const response = await cart.removeProduct(cartId, productId);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

module.exports = {
    cart,
    createCartController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController,
}