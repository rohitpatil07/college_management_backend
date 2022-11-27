import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';

const router = Router();

router.get('/student', filterControllers.getAllStudents);
router.get('/student/:roll_no', filterControllers.getStudent);
router.get('/student/dept/:dept', filterControllers.getStudentsByDept);
router.post('/student/dashboard', filterControllers.getDashboard);
router.post('/student/dashboard/:page&:limit', filterControllers.getPaginatedDashboard);

router.get('/company', filterControllers.getAllCompanies);

export default router;
