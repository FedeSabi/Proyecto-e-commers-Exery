import express from "express";
import Product from "../models/productModel.js";
import Cart from "../models/cart.js";

const cartsRouter = express.Router();

cartsRouter.use((req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.redirect('/auth/login')
  }
});

//ver este codigo para insertar en un carrito
// Ruta para agregar un producto al carrito
cartsRouter.get('/add/:productId', (req, res) => {
    const productId = req.params.productId;

    (async function getProduct() {
      try {
          var products = await Product.find({_id: productId});

          if (products != null && products.length > 0) {
            
          }

          var carts = await Cart.find({userId: req.user._id});
          var cart = carts != null && carts.length > 0 ? carts[0] : { orders: [], userId: req.user._id };
  
          var objIndex = cart.orders.findIndex(x=>x.productId == productId);

          if(objIndex >= 0)
            cart.orders[objIndex].quantity++;
          else 
            cart.orders.push({productId: productId, quantity: 1})

        if(!cart.id)
          await Cart.insertMany([cart]);
        else
          await Cart.updateOne(cart);

          res.redirect('/products')
      } catch (error) {
          console.log(error);
      }
  })();
});
  

export default cartsRouter;