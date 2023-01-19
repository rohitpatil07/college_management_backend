import { Router } from 'express';
import productControllers from '../../controllers/MarketControllers/productControllers.js';

const router = Router();

router.get('/', productControllers.getProducts);
router.post('/product', productControllers.getProduct);
router.post('/addproduct', productControllers.createProduct);
router.post('/buyproduct', productControllers.buyProduct);
router.post('/transactions', productControllers.getTransactions);
router.post('/addlostitem', productControllers.createLostItem);
router.get('/lost_items', productControllers.getLostItems);
router.post('/mylost_items', productControllers.getMyLostItems);
router.post('/lost_item', productControllers.getLostItem);
router.post('/addmessage', productControllers.createMessage);
router.post('/lostitemthread', productControllers.getThread);
router.post('/replies', productControllers.getReplies);

export default router;
