import { Router } from 'express';
import subjectController from '../../controllers/LMSControllers/subjectController.js';

const router = Router();

router.get('/', subjectController.getSubject);

export default router;
