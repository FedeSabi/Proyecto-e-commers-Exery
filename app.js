import express from 'express';
import morgan from 'morgan';
import path from 'path';
import authRouter from './routers/authRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passportConfig from './config/passport.js';
import flash from 'connect-flash';
import productsRouter from './routers/productsRouter.js';
import adminProductsRouter from './routers/adminProductsRouter.js';
import cartsRouter from './routers/cartRouter.js';




dotenv.config({ path: `./.env` });

const PORT = process.env.PORT || 3030;

const __dirname = path.resolve();
const app = express()

app.use(morgan('tiny'));

// middlerware para q lea archivos desde el body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookie de passport   
app.use(cookieParser());


//conectamos app.session formulada por IA!!!!!!!!!
app.use(session({
    secret: 'my-secret-key',
    resave: true,
    saveUninitialized: true
  }));
  
// traigo la funcion de passport
passportConfig(app);

// para los mensajes flash connect  (revisar que da error)
app.use(flash());
    app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});


//carpeta de uso estatico
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))

//motor de plantillas
app.set('view engine','ejs')
app.set('views', __dirname + '/views')

// rutas
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/adminProducts', adminProductsRouter);
app.use('/cart', cartsRouter);


//rutas views index.ejs
app.get('/',(req,res)=>{
    res.render('index',{titulo : 'mi titulo dinámico'})
})

app.get('/', (req,res) =>{
    res.send('Mi respuesta desde express')
})
// formulario de contacto
app.get('/contacto',(req,res) =>{
    res.render('contacto',{tituloServicios: 'estas en la pagina de servicios dinamico'})
})
 //productos
 app.get('/producto1',(req,res) =>{
    res.render('producto1',{mensaje: 'pagina producto1'})
})

app.get('/producto2',(req,res) =>{
    res.render('producto2',{mensaje: 'pagina producto2'})
})

app.get('/producto3',(req,res) =>{
    res.render('producto3',{mensaje: 'pagina producto3'})
})

app.get('/producto4',(req,res) =>{
    res.render('producto4',{mensaje: 'pagina producto4'})
})

app.use((req,res,next) => {
    res.status(404).render('404',{
        titulo:'404',
        descripcion:'Titulo del sitio web'
})
})

app.listen(PORT,()=>{
    console.log('el servidor esta conectado en el puerto',PORT)
})
  // cambie el mongoose porque no funcionaba con ese codigo!!!!
     mongoose
    .connect(process.env.DB)
    .then(mensaje => {
        console.log('DB CONECTADA')
    })
    .catch(error => console.log(error.stack));

