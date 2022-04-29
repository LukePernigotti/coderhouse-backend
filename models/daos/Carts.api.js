import mongoose from 'mongoose';

import MongoDBContainer from '../containers/MongodbContainer.js';
import CartSchema from '../schemas/Cart.schema.js';
import ProductSchema from '../schemas/Product.schema.js';

const collection = 'carts';

class CartsApi extends MongoDBContainer {
    constructor() {
        super(collection, CartSchema)
    }

    async get(userId) {
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
            throw new Error(error.message);
        }
    }

    async add(userId, productId) {
        try {
            const productsModel = mongoose.model('products', ProductSchema);
            const productDocument = await productsModel.findById(productId);
            
            const cart = await this.get(userId);
            
            const cartDocument = await this.model.updateOne(
                { '_userId': userId }, 
                { $push: { products: productDocument } }
            );
                
            return cartDocument;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async clear(userId) {
        try {
            const removedElement = await this.model.findOneAndDelete({ userId });

            return removedElement;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default CartsApi