import { Router } from 'express';
import productManager from '../productManager.js';
const productsRouter = Router();

const prodsManager = new productManager();

productsRouter.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const productos = await prodsManager.getProducts();

    if (limit) {
      const limitProducts = productos.slice(0, limit);
      return res.json(limitProducts);
    }
    return res.json(productos);
  } catch (err) {
    console.log(err);
    res.send('Error al obtener los productos');
  }
});

productsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const producto = await prodsManager.getProductById(id);
    res.json(producto);
  } catch (err) {
    console.log(err);
    res.send(`Error al obtener el producto con el id ${id}`);
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      status = true,
      stock,
    } = req.body;
    const response = await prodsManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      status,
      stock,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
    res.send('Error al intentar agregar el producto');
  }
});

productsRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      status = true,
      stock,
    } = req.body;
    const response = await prodsManager.updateProduct(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      status,
      stock,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
    res.send(`Error al obtener al actualizar el producto con id ${id}`);
  }
});

productsRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prodsManager.deleteProduct(id);
    res.send('Producto eliminado con exito');
  } catch (err) {
    console.log(err);
    res.send(`Error al eliminar el producto con el id ${id}`);
  }
});

export default productsRouter;
