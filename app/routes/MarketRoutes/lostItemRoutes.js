import { Router } from 'express';
import lostItemControllers from '../../controllers/MarketControllers/lostItemControllers.js';

const router = Router();

router.post('/addlostitem', lostItemControllers.createLostItem);
router.get('/', lostItemControllers.getLostItems);
router.post('/mylost_items', lostItemControllers.getMyLostItems);
router.post('/lost_item', lostItemControllers.getLostItem);
router.post('/addmessage', lostItemControllers.createMessage);
router.post('/lostitemthread', lostItemControllers.getThread);
router.post('/replies', lostItemControllers.getReplies);

export default router;
