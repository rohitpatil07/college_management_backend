import { Router } from 'express';
import studentControllers from '../controllers/formControllers.js';
import companyControllers from '../controllers/formControllers.js';

const router = Router();

router.post('/student', studentControllers.createStudent);
router.post('/student/academicinfo', studentControllers.createAcademicInfo);
router.post('/student/applieddrive', studentControllers.createAppliedDrive);
router.post('/student/extracurricular', studentControllers.createExtracurricular);
router.post('/student/offer', studentControllers.createOffer);
router.post('/student/project', studentControllers.createProject);
router.post('/student/resumedata', studentControllers.createResumedata);
router.post('/student/workexperience', studentControllers.createWorkexperience);

router.post('/company', companyControllers.createCompany);
router.post('/company/drive', companyControllers.createDrives)

export default router;
