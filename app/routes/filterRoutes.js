import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';

const router = Router();

router.get('/', filterControllers.getAllStudents);
router.get('/:roll_no', filterControllers.getStudent);
router.get('/dept/:dept', filterControllers.getStudentsByDept);
router.post('/dashboard/:page&:limit', filterControllers.getPaginatedDashboard);

export default router;
