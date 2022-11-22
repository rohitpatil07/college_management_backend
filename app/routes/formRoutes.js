import { Router } from 'express';
import formControllers from '../controllers/formControllers.js';

const router = Router();

router.get('/', formControllers.createStudent);

export default router;
