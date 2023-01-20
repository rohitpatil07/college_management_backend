import { Router } from 'express';
import subjectController from '../../controllers/LMSControllers/formController.js';
import facultyController from '../../controllers/LMSControllers/formController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.post(
  '/addmodule',
  authenticate(['faculty']),
  subjectController.upsertModule,
);
router.post(
  '/addreadmat',
  authenticate(['faculty']),
  subjectController.upsertReadingMaterial,
);
router.post(
  '/addsubject',
  authenticate(['faculty']),
  subjectController.createSubject,
);
//route below needs a finalised schema for more details visits subject services
//router.post('/addsubtostu', subjectController.updateStudents)
router.post(
  '/addfaculty',
  authenticate(['faculty']),
  facultyController.upsertFaculty,
);

export default router;
