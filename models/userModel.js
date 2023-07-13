import { Schema, model } from "mongoose";

let userScheme = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    role: String
})

export default model('User', userScheme)