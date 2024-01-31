import Express from 'express';
import productManager from '../productManager.js';
const router = Express.Router();
const prodsManager = new productManager('productos.json');

router.get('/chat', (req, res) => {
  res.render('index', {});
});
router.get('/', async (req, res) => {
  let products = await prodsManager.getProducts();
  res.render('home', { products });
});
router.get('/realtimeproducts', async (req, res) => {
  let products = await prodsManager.getProducts();
  res.render('realTimeProducts');
});

export default router;
