import { Router } from 'express';
import subjectController from '../../controllers/LMSControllers/formController.js';
import facultyController from '../../controllers/LMSControllers/formController.js';

const router = Router();

router.post('/subject', subjectController.upsertSubject);
router.post('/faculty', facultyController.upsertFaculty);

export default router;