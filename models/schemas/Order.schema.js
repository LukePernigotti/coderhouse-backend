const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    items: { type: Array },
    date: { type: Date },
    status: { type: String },
});

module.exports = OrderSchema;