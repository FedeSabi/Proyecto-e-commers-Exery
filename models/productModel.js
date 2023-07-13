import { Schema, model } from "mongoose";

let productScheme = new Schema({
    descripcion: String,
    tipo: String,
    stock: Number,
    precio: Number,
    imagen: String
})

export default model('Product', productScheme)