import { Router } from 'express';
import studentControllers from '../controllers/formControllers.js';
import companyControllers from '../controllers/formControllers.js';
import authenticate from '../middlewares/auth.js';

const router = Router();

router.post(
  '/student',
  authenticate(['student',"admin"]),
  studentControllers.upsertStudent,
);
router.post(
  '/student/academicinfo',
  authenticate(['student']),
  studentControllers.createAcademicInfo,
);
router.post(
  '/student/applieddrive',
  authenticate(['student']),
  studentControllers.createAppliedDrive,
);
router.post(
  '/student/extracurricular',
  authenticate(['student']),
  studentControllers.createExtracurricular,
);
router.post(
  '/admin/student/offer',
  authenticate(['admin']),
  studentControllers.createOffer,
);
router.post(
  '/admin/student/bulkoffers',
  authenticate(['admin']),
  studentControllers.createBulkOffers,
);
router.post(
  '/admin/student/updateoffer',
  authenticate(['admin']),
  studentControllers.updateOffer,
)
router.post(
  '/student/project',
  authenticate(['student']),
  studentControllers.createProject,
);
router.post(
  '/student/resumedata',
  authenticate(['student', 'admin', 'company']),
  studentControllers.createResumedata,
);
router.post(
  '/student/workexperience',
  authenticate(['student']),
  studentControllers.createWorkexperience,
);
router.post('/company', companyControllers.createCompany);
router.post(
  '/company/drive',
  authenticate(['admin','company']),
  companyControllers.createDrives,
);

export default router;
