import { Router } from 'express';
import subjectController from '../../controllers/LMSControllers/formController.js';
import facultyController from '../../controllers/LMSControllers/formController.js';

const router = Router();

router.post('/addmodule', subjectController.upsertModule);
router.post('/addreadmat',subjectController.upsertReadingMaterial);
router.post('/addsubject', subjectController.createSubject);
//route below needs a finalised schema for more details visits subject services 
//router.post('/addsubtostu', subjectController.updateStudents)
router.post('/addfaculty', facultyController.upsertFaculty);

export default router;