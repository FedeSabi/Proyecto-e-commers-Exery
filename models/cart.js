import { Schema, model } from "mongoose";

let cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity:{
        type:Number,
        default: 1,
    },
});

const cartSchema = new Schema({
    items: [cartItemSchema],
})


export default model('Cart', cartSchema)