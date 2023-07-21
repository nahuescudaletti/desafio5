import express from 'express';  
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express (); 


app.use(express.json());

app.use(express.urlencoded ({extended: true})); 

app.use(express.static((`${__dirname}/public`)))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use  ('/', viewsRouter);

const server = app.listen(8080, ()=> console.log("Listening 8080"))
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
