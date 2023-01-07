import { Router } from 'express';
import facultyController from '../../controllers/LMSControllers/filterController.js';
import moduleController from '../../controllers/LMSControllers/filterController.js';
import subjectController from '../../controllers/LMSControllers/filterController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.get('/allfaculties', facultyController.getAllFaculty);
router.get('/faculty/:dept', facultyController.getFacultybyDept);
router.get('/mailfaculty/:mail', facultyController.getFacultybyMail);

router.get('/allsubjects', authenticate(["faculty","students"]),subjectController.getAllSubject);
router.get('/subject/:subid', subjectController.getSubjectbyID);
router.post('/faculty/subject',authenticate(["admin","faculty"]), subjectController.getAllFacSubs);
router.get('/department/subject/:batch/:dept', subjectController.getSubbyDept)

router.get('/module/:moduleid',moduleController.getModulebyID)
router.get('/allmodules/:subid',moduleController.getModulebySubject)
export default router;