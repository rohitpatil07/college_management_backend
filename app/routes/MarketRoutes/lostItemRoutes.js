import { Router } from 'express';
import lostItemControllers from '../../controllers/MarketControllers/lostItemControllers.js';';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.post('/addlostitem',authenticate(["student,faculty,admin,lms_admin"]),lostItemControllers.createLostItem);
router.get('/',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.getLostItems);
router.post('/mylost_items',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.getMyLostItems);
router.post('/lost_item',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.getLostItem);
router.post('/addmessage',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.createMessage);
router.post('/lostitemthread', lostItemControllers.getThread);
router.post('/replies',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.getReplies);
router.post('/update',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.updateLostItem);
router.post('/delete',authenticate(["student,faculty,admin,lms_admin"]), lostItemControllers.deleteLostItem);

export default router;
