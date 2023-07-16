import express from "express";
import Product from "../models/productModel.js";

const adminProductsRouter = express.Router();

adminProductsRouter.route('/').get((req, res) => {
    (async function getProducts() {
        try {
            var products = await Product.find({});
            if (products) {
                res.render('adminProducts', { products });
            }
        } catch (error) {
            console.log(error);
        }
    })();
});

adminProductsRouter.route('/add').get((req, res) => {
    res.render('productForm', { product: null });
});

adminProductsRouter.route('/addOrEdit').post((req, res) => {
    const { descripcion, tipo, stock, precio, imagen, productId } = req.body;
    console.log(productId);
    if (productId) {
        (async function updateProduct() {
            try {
                const products = await Product.find({ _id: productId });

                if (products != null && products.length > 0) {
                    var product = products[0];
                    product.descripcion = descripcion;
                    product.tipo = tipo;
                    product.stock = stock;
                    product.precio = precio;
                    product.imagen = imagen;

                    await Product.updateOne(product);

                    req.flash('success_msg', 'Se editó el producto correctamente.');

                    setTimeout(() => {
                        res.redirect('/adminProducts');
                    }, 1500);
                }
                else{
                    //TODO mostrar mensaje de error que no se encontró el product
                }
            } catch (error) {
                console.log(error);
            }
        })();

    } else {
        (async function addProduct() {
            try {
                const product = { descripcion, tipo, stock, precio, imagen };
                await Product.insertMany([product]);
                console.log(product)

                req.flash('success_msg', 'Se agregó el producto correctamente.');

                setTimeout(() => {
                    res.redirect('/adminProducts');
                }, 1500);
            } catch (error) {
                console.log(error);
            }
        })();
    }
});

adminProductsRouter.route('/edit/:id').get((req, res) => {
    (async function getProduct() {
        try {
            const products = await Product.find({ _id: req.params.id });
            if (products != null && products.length > 0) {
                //TODO validar que products tenga algo en el array
                res.render('productForm', { product: products[0] })
            };
        } catch (error) {
            console.log(error);
        }
    })();
});

adminProductsRouter.route('/delete/:id').get((req, res) => {
    (async function deleteProduct() {
        try {
            const product = await Product.find({ _id: req.params.id });
            if (product === null) {
                req.flash('error_msg', 'Producto no encontrado')
            }
            await Product.deleteOne(product[0])
            req.flash('success_msg', 'El producto se elimino correctamente')
            setTimeout(() => {
                res.redirect('/adminProducts');
            }, 1500);

        } catch (error) {
            console.log(error);
        }
    })();
});


export default adminProductsRouter;