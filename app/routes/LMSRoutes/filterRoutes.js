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
router.post('/student/subjects',authenticate(['student']), subjectController.getSubjectofStudent)
router.post('/facultysubjects',authenticate(['lms_admin','faculty']), filterController.getFacultySubjects);
router.get('/department/subject/:batch/:dept/:sem',authenticate(['lms_admin','student','faculty']), subjectController.getSubbyDept);
router.post('/faculty/subjectfiter',authenticate(['lms_admin','faculty']), subjectController.getSubforFaculty);

router.get('/subject/getstudents/:subid',authenticate(['lms_admin','faculty']), subjectController.getStudentsbySubID);
router.get('/divison/getstudents/:dept/:div/:batch/:sem',authenticate(['lms_admin','faculty']), subjectController.getStudentsbyBatch);

router.post('/faculty/attendence',authenticate(['faculty']), subjectController.getFacAtt);
router.post('/student/attendence',authenticate(['student']), subjectController.getStuAtt);

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

router.get('/getForum/:forumid',authenticate(['faculty','student']), subjectController.getForumById)
router.get('/getallForums/:moduleid',authenticate(['faculty','student']), subjectController.getForumByModuleId)
//router.get('/top/comments/:forumid',authenticate(['faculty','student']), subjectController.getTopComments)
router.get('/getreplies/:message_id', authenticate(['faculty','student']), subjectController.getReplies)

router.get('/getallassignments/:subid',authenticate(['student','faculty']), subjectController.getAssignBySub)
router.get('/faculty/getassignment/:assign_id',authenticate(['faculty']), subjectController.getAssforFacbyID)
router.get('/student/getassignment/:assign_id/:roll_no',authenticate(['student']), subjectController.getAssforStubyID)
router.get('/student/getsubmission/:roll_no',authenticate(['student']), subjectController.getSubmissionsforStu)

router.get('/findDILO/:batch/:dept/:sem',authenticate(['lms_admin']), subjectController.getDILOs)
router.get('/admin/DILOform/:form_id',authenticate(['lms_admin']), subjectController.getDILOform)

router.get('/admin/data/:email',authenticate(['lms_admin']), subjectController.getAdminData)

export default router;
