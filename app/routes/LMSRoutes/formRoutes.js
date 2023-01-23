import { Router } from 'express';
import subjectController from '../../controllers/LMSControllers/formController.js';
import facultyController from '../../controllers/LMSControllers/formController.js';
import lmsadminController from '../../controllers/LMSControllers/formController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.post(
  '/addmodule',
  authenticate(['faculty']),
  facultyController.upsertModule,
);
router.post(
  '/addreadmat',
  authenticate(['faculty']),
  facultyController.upsertReadingMaterial,
);
router.post(
  '/addsubject',
  authenticate(['faculty']),
  facultyController.createSubject,
);
router.post(
  '/addDILO',
  authenticate(['student','lms_admin']),
  lmsadminController.addDILO,
)
router.post(
  '/addDILOform',
  authenticate(['lms_admin']), 
  lmsadminController.createForm
)

router.post(
  '/faculty/upsertAssignment',
  authenticate(['faculty']),
  facultyController.upsertAssignmentTeachers,
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
  '/upsertForum',
  authenticate(['student']),
  facultyController.upsertForum,
)
router.post(
  '/postcomment',
  authenticate(['student','facilty']),
  subjectController.postComment,
)
router.post(
  '/postreply',
  authenticate(['student','facilty']),
  subjectController.postComment,
)
router.post(
  '/updatecomment',
  authenticate(['student','facilty']),
  subjectController.updateComment,
)
router.post(
  '/create/bulkstudent/',
  authenticate(['lms_admin']),
  lmsadminController.createBulkStudent,
)

router.post(
  '/addfaculty',
  authenticate(['lms_admin']),
  lmsadminController.upsertFaculty,
);

export default router;
