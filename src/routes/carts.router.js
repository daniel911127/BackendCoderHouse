const Router = require('express');
const CartManager = require('../cartManager');
const cartManager = require('../cartManager');

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
  try {
    const resp = await CartManager.newCart();
    res.json(resp);
  } catch (error) {
    res.send('Error al crear carrito');
  }
});

cartsRouter.get('/', async (req, res) => {
  try {
    const resp = await CartManager.getCarts();
    res.json(resp);
  } catch (error) {
    res.send('Error al obtener carritos');
  }
});
cartsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await cartManager.getCartsProducts(id);
    res.json(resp);
  } catch (error) {
    res.send('Error al mostrar carritos');
  }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cartManager.AddProductCart(cid, pid);
    res.send(resp);
  } catch (error) {
    res.send('Error al guardar producto en el carrito');
  }
});
module.exports = cartsRouter;
