import { Router } from 'express';
import deleteControllers from '../controllers/deleteControllers.js';
import authenticate from '../middlewares/auth.js'
const router = Router();

router.get('/student/image/:rollno', authenticate(["student"]),deleteControllers.removeStuPic);
router.get('/drive/:driveid', authenticate(["admin"]),deleteControllers.removeDrive);
router.get('/applied/:driveid/:rollno', authenticate(["admin"]),deleteControllers.removeApplied);
router.get('/offer/:offerid', authenticate(["admin"]),deleteControllers.removeOffer);


export default router;