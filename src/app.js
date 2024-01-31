import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const port = 8080;
const httpServer = app.listen(port, (req, res) => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.get('/ping', (req, res) => {
  res.send('pong');
});

let messages = [];
io.on('connection', (socket) => {
  console.log('nuevo cliente conectado');

  socket.on('message', (data) => {
    messages.push(data);
    io.emit('messageLogs', messages);
  });

  socket.on('login', (data) => {
    socket.emit('messageLogs', messages);
    socket.broadcast.emit('register', data);
  });
});
