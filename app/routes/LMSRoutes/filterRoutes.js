import { Router } from 'express';
import facultyController from '../../controllers/LMSControllers/filterController.js';
import filterController from '../../controllers/LMSControllers/filterController.js';
import moduleController from '../../controllers/LMSControllers/filterController.js';
import subjectController from '../../controllers/LMSControllers/filterController.js';
import readingController from '../../controllers/LMSControllers/filterController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.get('/allfaculties',authenticate(['lms_admin']), facultyController.getAllFaculty);
router.get('/faculty/:dept',authenticate(['lms_admin']), facultyController.getFacultybyDept);
router.get('/mailfaculty/:mail',authenticate(['lms_admin','faculty']), facultyController.getFacultybyMail);

router.get(
  '/allsubjects',
  authenticate(['lms_admin']),
  subjectController.getAllSubject,
);
router.get('/subject/:subid',authenticate(['lms_admin','student','faculty']), subjectController.getSubjectbyID);
router.post('/facultysubjects',authenticate(['lms_admin','faculty']), filterController.getFacultySubjects);
router.get('/department/subject/:batch/:dept/:sem',authenticate(['lms_admin','student','faculty']), subjectController.getSubbyDept);

router.get(
  '/module/:moduleid',
  authenticate(['faculty','student']),
  moduleController.getModulebyID,
);
router.get(
  '/allmodules/:subid',
  authenticate(['faculty', 'student']),
  moduleController.getModulebySubject,
);

router.get(
  '/readmat/module/:moduleid',
  authenticate(['faculty','student']),
  readingController.getReadMatByModuleId,
);


export default router;
