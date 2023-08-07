import express from 'express';  
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { connect } from 'mongoose';
import indexRouter from './routes/indexRouter.js';



const app = express (); 


app.use(express.json());

app.use(express.urlencoded ({extended: true})); 

app.use(express.static((`${__dirname}/public`)))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use  ('/', viewsRouter);
app.use ('/api', indexRouter);

const PORT = 8080
const ready=()=>{
    console.log("server listening" +PORT)
    connect('mongodb+srv://nahuelscudaletti:1234@cluster0.oeqaokf.mongodb.net/integrador')
    .then(()=>console.log('db connected'))
    .catch(err=>console.log(err))
}
const server = app.listen(PORT,ready)//y esa aplicación de express está escuchando en un puerto 
const io = new Server (server);


const products = [];

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('newProduct', (newProduct) => {
    products.push(newProduct);
    io.emit('productList', products);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
