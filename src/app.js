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
const socketServer = new Server(httpServer);

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

socketServer.on('connection', (socket) => {
  console.log('nuevo cliente conectado');

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.emit(
    'evento_para_socket_individual',
    'Este evento solo lo debe recibir el socket actual'
  );

  socket.broadcast.emit(
    'evento_pata_todos_menos_el_socket_actual',
    'Se conecto otro cliente'
  );

  socketServer.emit(
    'evento_para_todos',
    'Este evento esta siendo escuchado por todos'
  );
});
