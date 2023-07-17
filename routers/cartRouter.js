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

          var carts = await Cart.find({userId: req.user._id, estado: 'Abierto'});
          var cart = carts != null && carts.length > 0 ? carts[0] : { orders: [], userId: req.user._id, estado: 'Abierto' };
  
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

cartsRouter.get('/showOrder', (req,res)=> {  
  (async function getCart() {
    try {
        var carts = await Cart.find({userId: req.user._id, estado: 'Abierto'});
        var cart = carts != null && carts.length > 0 ? carts[0] : { orders: [], userId: req.user._id, estado: 'Abierto' };

        var cartToShow = {id: cart.id, orders: []};

        for (let i = 0; i < cart.orders.length; i++) {
         var products = await Product.find({ _id: cart.orders[i].productId });
         
         if (products != null && products.length > 0) {
          cartToShow.orders.push({product: products[0], quantity: cart.orders[i].quantity});
         }
        }

        res.render('productsCart', {cart: cartToShow})
    } catch (error) {
        console.log(error);
    }
  })();
})

cartsRouter.get('/close/:id', (req,res)=> {  
  (async function closeCart() {
    try {
        var carts = await Cart.find({_id: req.params.id});
       if(carts != null && carts.length > 0){
        var cart = carts[0];

        cart.estado = 'Cerrado';
        await Cart.updateOne(cart);
       }

        res.render('closeCart')
    } catch (error) {
        console.log(error);
    }
  })();
})

export default cartsRouter;