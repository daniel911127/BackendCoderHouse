import express from 'express';
import ProductManager from './main';
const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.log('Aplicacion corriendo en el puerto 3000');
});
