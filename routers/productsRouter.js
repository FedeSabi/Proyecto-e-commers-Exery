import express from "express";
import Product from "../models/productModel.js";
import Cart from "../models/cart.js";

const productsRouter = express.Router();

productsRouter.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login')
    }
});

productsRouter.route('/').get((req, res) => {
    (async function getProducts() {
        try {
            var products = await Product.find({});
            if (products) {
                if (req.user.role == 'user')
                    res.render('products', { products });
                else if (req.user.role == 'admin')
                    res.render('adminProducts', { products });
            }
        } catch (error) {
            console.log(error);
        }
    })();
});



export default productsRouter;