import MongoDBContainer from '../../containers/MongodbContainer.js';

import MongoDBContainer from '../../containers/MongodbContainer.js';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const collection = 'carts';

const CartsSchema = new Schema({
    products: { type: Array }
});

class CartsDaoMongoDb extends MongoDBContainer {
    constructor() {
        super(collection, CartsSchema)
    }

    async add(cartId, productId) {
        return super.add(cartId, productId, true)
    }
}

export default CartsDaoMongoDb
