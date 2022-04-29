import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    thumbnail: { type: String },
    code: { type: String, unique: true },
});

export default ProductSchema;