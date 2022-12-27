/* eslint-disable prettier/prettier */
import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';
import authenticate from '../middlewares/auth.js'
const router = Router();

router.get('/students', authenticate(["admin"]),filterControllers.getAllStudents);
router.get('/student/:roll_no',authenticate(["admin","student"]), filterControllers.getStudent);
router.get('/student/dept/:dept',authenticate(["admin"]), filterControllers.getStudentsByDept);
router.post('/dashboard',authenticate(["admin"]),filterControllers.getDashboard);
router.post(
  '/dashboard/:page&:limit',authenticate(["admin"]),
  filterControllers.getPaginatedDashboard,
);

router.get('/company',authenticate(["admin"]), filterControllers.getAllCompanies);
router.post("/notify" ,authenticate(["company"]) , filterControllers.notify);
export default router;
