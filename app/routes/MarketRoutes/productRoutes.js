import { Router } from 'express';
import productControllers from '../../controllers/MarketControllers/productControllers.js';

const router = Router();

router.get('/', productControllers.getProducts);
router.post('/product', productControllers.getProduct);
router.post('/addproduct', productControllers.createProduct);
router.post('/buyproduct', productControllers.buyProduct);
router.post('/transactions', productControllers.getTransactions);
router.post('/product_name', productControllers.getProducstByName);
router.post('/category', productControllers.getProductsByCategory);

export default router;
