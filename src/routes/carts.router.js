import Router from 'express';
import cartManager from '../cartManager.js';

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
  try {
    const resp = await cartManager.newCart();
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al crear carrito');
  }
});

cartsRouter.get('/', async (req, res) => {
  try {
    const resp = await cartManager.getCarts();
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al obtener carritos');
  }
});
cartsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await cartManager.getCartsProducts(id);
    res.json(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al mostrar carritos');
  }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cartManager.AddProductCart(cid, pid);
    res.send(resp);
  } catch (error) {
    console.log(error);
    res.send('Error al guardar producto en el carrito');
  }
});
export default cartsRouter;
