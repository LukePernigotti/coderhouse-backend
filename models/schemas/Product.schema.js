const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    thumbnail: { type: String },
    category: { type: String },
});

module.exports = ProductSchema;