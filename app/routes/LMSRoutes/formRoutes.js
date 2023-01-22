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
router.post(
  '/addDILO',
  authenticate(['student','lms_admin']),
  subjectController.addDILO,
)
router.post(
  '/addDILOform',
  authenticate(['lms_admin']), 
  subjectController.createForm
)

router.post(
  '/faculty/upsertAssignment',
  authenticate(['faculty']),
  subjectController.upsertAssignmentTeachers,
);
router.post(
  '/student/submitAssignment',
  authenticate(['student']),
  subjectController.createAssignmentStudents,
)
router.post(
  '/student/updatesubmission',
  authenticate(['student']),
  subjectController.updateAssignmentStudents,
)

router.post(
  '/addfaculty',
  authenticate(['lms_admin']),
  facultyController.upsertFaculty,
);

export default router;
