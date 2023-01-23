import { Router } from 'express';
import facultyController from '../../controllers/LMSControllers/filterController.js';
import filterController from '../../controllers/LMSControllers/filterController.js';
import moduleController from '../../controllers/LMSControllers/filterController.js';
import subjectController from '../../controllers/LMSControllers/filterController.js';
import readingController from '../../controllers/LMSControllers/filterController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.get('/allfaculties', authenticate(['lms_admin']), facultyController.getAllFaculty);
router.get('/faculty/:dept', authenticate(['lms_admin']), facultyController.getFacultybyDept);
router.get('/mailfaculty/:mail', authenticate(['lms_admin', 'faculty']), facultyController.getFacultybyMail);

router.get(
  '/allsubjects',
  authenticate(['lms_admin']),
  subjectController.getAllSubject,
);
router.get('/subject/:subid', authenticate(['lms_admin', 'student', 'faculty']), subjectController.getSubjectbyID);
router.get('/subject/getstudents/:subid', authenticate(['lms_admin', 'faculty']), subjectController.getStudentsbySubID);
router.post('/facultysubjects', authenticate(['lms_admin', 'faculty']), filterController.getFacultySubjects);
router.get('/department/subject/:batch/:dept/:sem', authenticate(['lms_admin', 'student', 'faculty']), subjectController.getSubbyDept);

router.get(
  '/module/:moduleid',
  authenticate(['faculty', 'student']),
  moduleController.getModulebyID,
);
router.get(
  '/allmodules/:subid',
  authenticate(['faculty', 'student']),
  moduleController.getModulebySubject,
);

router.get(
  '/readmat/module/:moduleid',
  authenticate(['faculty', 'student']),
  readingController.getReadMatByModuleId,
);

<<<<<<< HEAD
router.get('/getallassignments/:subid', authenticate(['student', 'faculty']), subjectController.getAssignBySub)
router.get('/faculty/getassignment/:assign_id', authenticate(['faculty']), subjectController.getAssforFacbyID)
router.get('/student/getassignment/:assign_id/:roll_no', authenticate(['student']), subjectController.getAssforStubyID)

router.get('/findDILO/:batch/:dept/:sem', authenticate(['lms_admin']), subjectController.getDILOs)
=======
router.get('/getForum/:moduleid',authenticate(['faculty','student']), subjectController.getForumByModuleId)

router.get('/getallassignments/:subid',authenticate(['student','faculty']), subjectController.getAssignBySub)
router.get('/faculty/getassignment/:assign_id',authenticate(['faculty']), subjectController.getAssforFacbyID)
router.get('/student/getassignment/:assign_id/:roll_no',authenticate(['student']), subjectController.getAssforStubyID)
router.get('/student/getsubmission/:roll_no',authenticate(['student']), subjectController.getSubmissionsforStu)
router.get('/findDILO/:batch/:dept/:sem',authenticate(['lms_admin']), subjectController.getDILOs)
>>>>>>> 63db7f5abe72bb03314bbe21b56142603d8be0d4

router.get('/admin/DILOform/:form_id', authenticate(['lms_admin']), subjectController.getDILOform)
router.get('/admin/data/:email', authenticate(['lms_admin']), subjectController.getAdminData)

router.post('/student/subjects', authenticate(['student']), subjectController.getSubjectofStudent)
export default router;
