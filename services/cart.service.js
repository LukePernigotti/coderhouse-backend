import twilio from 'twilio';
import { transporter, mailOptions } from "../ethereal.js";
import { CartsApi } from '../models/index.js';

const cart = new CartsApi();

const buyService = async (req, res) => {
    const cartDocument = await cart.getById(req.user._id);

    const accountSid = 'AC452f166aea5b749ecd49cf636e9cfaba'
    const authToken = '125922fd13e0009ba70c1ac50e0a2488'

    const client = twilio(accountSid, authToken);

    try {
        const message = await client.messages.create({
            from: 'whatsapp:+15076930579',
            to: 'whatsapp:+14155238886',
            body: `New order: ${cartDocument.products.map(product => product + ', ')}.
            Your order is processing`,
        })
    } catch (error) {
        console.log(error)
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
    }

    await cart.clear(req.user._id);

    const response = {
        redirect: '/'
    }

    return response;
}

const getCartService = async (req, res) => {
    const user = req.user;
    const cartDocument = await cart.getById(user._id);

    const response = {
        body: '../pages/cart',
        data: {
            products: cartDocument.products
        }
    }
    
    return response;
};

const addProductToCartService = async (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const user = req.user;
    const productAdded = await cart.add(user._id, req.params.id);
    const cartDocument = await cart.getById(user._id);

    const response = { 
        body: '../pages/cart', 
        data: { products: cartDocument.products }
    }
    
    return res.render('main', response);
}

export {
    buyService,
    getCartService,
    addProductToCartService
}