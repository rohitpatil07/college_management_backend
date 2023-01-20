import { Router } from 'express';
import deleteControllers from '../controllers/deleteControllers.js';
import authenticate from '../middlewares/auth.js'
const router = Router();

router.get('/student/image/:rollno', authenticate(["student"]),deleteControllers.removeStuPic);
router.get('/drive/:driveid', authenticate(["admin","company"]),deleteControllers.removeDrive);
router.get('/applied/:driveid/:rollno', authenticate(["admin"]),deleteControllers.removeApplied);
router.get('/offer/:offerid', authenticate(["admin"]),deleteControllers.removeOffer);
router.get('/student/projects/:projectid', authenticate(["student"]),deleteControllers.removeProject);
router.get('/student/extra/:extraid', authenticate(["student"]),deleteControllers.removeExtracurricular);
router.get('/student/work/:workid', authenticate(["student"]),deleteControllers.removeWorkexperience);

export default router;