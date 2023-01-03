import { Router } from 'express';
import subjectController from '../../controllers/LMSControllers/filterController.js';
import facultyController from '../../controllers/LMSControllers/filterController.js';

const router = Router();

router.get('/allfaculties', facultyController.getAllFaculty)
router.get('/allsubjects', subjectController.getAllSubject);
router.get('/faculty/:dept', facultyController.getFacultybyDept)
router.get('/mailfaculty/:mail', facultyController.getFacultybyMail)

router.get('/subject/:subid', subjectController.getSubjectbyID)

export default router;