import MongoDBContainer from '../../containers/MongodbContainer.js';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const collection = 'products';

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    thumbnail: { type: String },
    code: { type: String, unique: true },
});

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super(collection, ProductSchema, { validateUpdate: validateUpdate });

        function validateUpdate(data) {
            const { name, description, price, stock, thumbnail, code } = data;
            if (!name && !description && !price && !stock && !thumbnail && !code) {
                return { error: 'Data not provided. Add a name, description, price, thumbnail, stock or code.' }
            }
            return true;
        }
    }
}

export default ProductsDaoMongoDB;