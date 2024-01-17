const express = require('express');
const ProductManager = require('./main');
const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/products', async (req, res) => {
  res.send(await ProductManager.getProducts());
});

app.get('/products/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await ProductManager.getProductById(id));
});

app.listen(3000, () => {
  console.log('Aplicacion corriendo en el puerto 3000');
});
