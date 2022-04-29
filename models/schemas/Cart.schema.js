import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId },
    products: { type: Array }
});

export default CartSchema;
