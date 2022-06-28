const mongoose = require('mongoose');

const MongoDBContainer = require('../containers/Mongodb.container.js');
const CartSchema = require('../schemas/Cart.schema.js');
const ProductSchema = require('../schemas/Product.schema.js');
const CustomError = require('../../utils/errors/CustomError.js');
const { STATUS } = require('../../utils/constants/api.constants.js');

const collection = 'carts';

class CartsDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!CartsDao.instance) {
            super(collection, CartSchema)
            CartsDao.instance = this;
            return this;
        } else {
            return CartsDao.instance;
        }
    }

    async getById(userId) {
        try {
            let document;
            document = await this.model.findOne({ userId });

            if (!document) {
                document = await this.model.create({ 
                    'userId': userId, 
                    products: [] 
                });
            };

            return document;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code, 
                `${STATUS.INTERNAL_ERROR.tag} Error while trying to get cart with id ${userId}`, 
                error
            );
        }
    }

    async add(userId, productId) {
        try {
            const productsModel = mongoose.model('products', ProductSchema);
            const productDocument = await productsModel.findById(productId);
            
            const cart = await this.getById(userId);
            
            const cartDocument = await this.model.updateOne(
                { '_userId': userId }, 
                { $push: { products: productDocument } }
            );
                
            return cartDocument;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code, 
                `${STATUS.INTERNAL_ERROR.tag} Error while trying to add cart with user id ${userId} and product id ${productId}`,
                error
            );
        }
    }

    async clear(userId) {
        try {
            const removedElement = await this.model.findOneAndDelete({ userId });

            return removedElement;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR.code, 
                `${STATUS.INTERNAL_ERROR.tag} Error while trying to clear cart with id ${userId}`, 
                error
            );
        }
    }
}

module.exports = CartsDao;