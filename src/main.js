import express from 'express'; //entonces ya tengo mi aplicación de express  
//como puse export default en user router, ahora podría importarla desde app.js (le paso la ruta a la que quiero visitar)
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express (); //la idea es que este app reciba la petición, va a reconocer la petición de tipo usuario y va a redirigirlo al archivo users.router.js


//middlewares: acá empieza la petición
//para que detecte los objetos que envío del código le digo que debe soportar el formato express y json
app.use(express.json());// lee json en las peticiones. 
//intercepta la petición: la petición viene en json? no? convertila a json y continua

app.use(express.urlencoded ({extended: true})); //objetos codificados desde la URl
//m: la petición venia en codificación de url) no? continua.

app.use(express.static((`${__dirname}/public`)))
//m: tengo que servir algún archivo estático? no? continua

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use  ('/', viewsRouter);
// app.use('/api/users', userRouter) //con esta línea de código ya me puedo conectar a los miniaplicativos
//m: la petición conincide con api/user? si? redirigi a pets router. 





const server = app.listen(8080, ()=> console.log("Listening 8080")) //y esa aplicación de express está escuchando en un puerto 

const io = new Server (server);

// io.on('connection', socket => {
//     console.log('Nuevo cliente conectado');

//     socket.on('message', data =>{
//         console.log(data)
//     });

//     socket.emit('evento_socket_individual', "este mensaje solo debe recibirlo el socket");

//     socket.broadcast.emit ('evento_todos_menos_actual', 'Lo verán todos menos el actual');

//     io.emit('evento_todos', 'Este mensaje les llegará a todos los usuarios');

// });



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
