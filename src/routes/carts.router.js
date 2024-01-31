import Router from 'express';
import cartManager from '../cartManager.js';

const cartsRouter = Router();
const cart = new cartManager();

cartsRouter.post('/', async (req, res) => {
  try {
    const resp = await cart.newCart();
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al crear carrito');
  }
});

cartsRouter.get('/', async (req, res) => {
  try {
    const resp = await cart.getCarts();
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al obtener carritos');
  }
});
cartsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await cart.getCartsProducts(id);
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al mostrar carritos');
  }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cart.AddProductCart(cid, pid);
    res.send(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al guardar producto en el carrito');
  }
});
export default cartsRouter;
