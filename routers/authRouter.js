import express from "express";
import User from "../models/userModel.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.route('/login')
    .get((req, res) => {
        res.render('login');
    }).post(
        passport.authenticate('local', {
            successRedirect: '/products',
            failureRedirect: '/auth/login',
            failureFlash: 'Usuario o password incorrecto.'
        })
    );

authRouter.route('/register')
    .get((req, res) => {
        res.render('register');
    }).post((req, res) => {
        const { email, password, nombre, apellido } = req.body;

        (async function addUser() {
            try {
                const user = { email, password, nombre, apellido, role: 'user' };
                var results = await User.insertMany([user]);
                req.login(results[0], () => {
                    res.redirect('/products');
                });
            } catch (error) {
                console.log(error);
            }
        })();
    });

    authRouter.route('/logout').get((req,res)=>{
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/auth/login');
          });
        });


export default authRouter;