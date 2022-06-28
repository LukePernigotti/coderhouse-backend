const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId },
    products: { type: Array }
});

module.exports = CartSchema;
