import { Schema, model } from "mongoose";

let cartScheme = new Schema({
    orders: [{
        productId: Schema.Types.ObjectId,
        quantity: Number
    }],
    userId: Schema.Types.ObjectId,
});

export default model('Cart', cartScheme)