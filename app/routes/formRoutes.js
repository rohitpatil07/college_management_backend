import { Router } from 'express';
import formControllers from '../controllers/formControllers.js';

const router = Router();

router.post('/student', formControllers.createStudent);

export default router;
