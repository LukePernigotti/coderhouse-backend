import { cartDao } from '../models/index.js';

const createCartController = async (req, res) => {
    const response = await cartDao.createCart();
    if (response.error) return res.status(404).send(response.error);
    return res.json({ id: response });
};


// const getAllCartsController = async (req, res) => {
//     const response = await cartDao.getAll();
//     if (response.error) return res.status(404).send(response.error);
//     return res.json(response);
// };


const deleteCartController = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).send(`id is missing from params: ${JSON.stringify(req.params)}`);
    const response = await cartDao.delete(id);

    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const getCartController = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).send(`id is missing from params: ${JSON.stringify(req.params)}`);
    
    const response = await cartDao.get(id);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const addProductController = async (req, res) => {
    const { id: cartId } = req.params;
    const { productId } = req.body;
    if (!cartId && !productId) 
        return res.status(400).send(`Cart id or/and product id missing from body or params.`);
    
    const response = await cartDao.add(cartId, productId);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

const removeProductController = async (req, res) => {
    const { id: cartId, id_prod: productId } = req.params;

    if (!cartId || !productId) 
        return res.status(400).send(`Cart id or/and product id missing from params.`);

    const response = await cartDao.removeProduct(cartId, productId);
    if (response.error) return res.status(404).send(response.error);
    return res.json(response);
};

export {
    createCartController,
    // getAllCartsController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController,
}