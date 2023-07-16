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

// barra de busqueda queda por ver si la implementamos

// productsRouter.route('/search').post((req, res) => {
//     (async function getProducts() {
//         try {
//             let products = await Product.find({descripcion: req.body.partialDescription});
//             if (products) {
//                 if (req.user.role == 'user')
//                     res.render('products', { products });
//                 else if (req.user.role == 'admin')
//                     res.render('adminProducts', { products });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     })();
// });

//ver este codigo para insertar en un carrito
// Ruta para agregar un producto al carrito
/* productsRouter.get('/cart/add/:productId', (req, res) => {
  const productId = req.params.id;
  console.log(productId)

  Product.findById(id, (err, Product) => {
    if (err || !Product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    Cart.findOne({}, (err, cart) => {
      if (err) {
        return res.status(500).json({ error: 'Error del servidor' });
      }

      if (!cart) {
        cart = new Cart();
      }

      const cartItem = cart.items.find((item) =>
        item.product.equals(productId)
      );

      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.items.push({ product: productId });
      }

      cart.save((err) => {
        if (err) {
          return res.status(500).json({ error: 'Error del servidor' });
        }

        res.redirect('/products'); // Redirige a la página de productos después de agregar al carrito
      });
    });
  });
});
 */

export default productsRouter;