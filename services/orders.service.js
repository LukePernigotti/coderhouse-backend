const { transporter, mailOptions } = require('../ethereal.js');
const { CartsApi, OrdersApi } = require('../models/index.js');
const CustomError = require('../utils/errors/CustomError.js');
const { STATUS } = require('../utils/constants/api.constants.js');

const cart = new CartsApi();
const orders = new OrdersApi;

const completeOrderService = async (req, res) => {
    if (!req.user) {
        throw new CustomError(
            STATUS.UNAUTHORIZED.code,
            `${STATUS.UNAUTHORIZED.tag} Can't access to a cart because you are not logged.`
        );
    }

    let cartDocument;
    try {
        cartDocument = await cart.getById(req.user._id);
    } catch (error) {
        throw Error(error);
    }


    mailOptions.subject = 'New order';
    mailOptions.html = `<h1>These are the products you bought:</h1>
    <ul>
        ${cartDocument.products.map(product => `<li>${product.name}</li>`)}
    </ul>
    
    <p>Your order is being processed. Thank you for your patience.</p>`;

    try {
        const mail = await transporter.sendMail(mailOptions);
        console.log('mail', mail);
    } catch (error) {
        console.log('error', error);
        return res.status(STATUS.INTERNAL_ERROR.code).send(`${STATUS.INTERNAL_ERROR.tag} ${error.message}`);
    }

    try {
        await orders.add({items: [...cartDocument.products], date: Date.now(), status: 'Generated'})
        await cart.clear(req.user._id);
    } catch (error) {
        return res.status(error.status).send(error.description);
    }

    const response = {
        redirect: '/'
    }

    return response;
}

module.exports = {
    completeOrderService
}