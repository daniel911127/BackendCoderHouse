const express = require('express');
const ProductsRouter = require('./routes/products.router.js');
const CartsRouter = require('./routes/carts.router.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, (req, res) => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
