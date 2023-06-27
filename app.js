const express = require ('express')
const app = express()
const port = 3000

//motor de plantillas
app.set('view engine','ejs')
app.set('views', __dirname + '/views')

//carpeta de uso estatico
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))

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

app.use((req,res,next) => {
    res.status(404).render('404',{
        titulo:'404',
        descripcion:'Titulo del sitio web'
})
})

app.listen(port,()=>{
    console.log('el servidor esta conectado en el puerto',port)
})