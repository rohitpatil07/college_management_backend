/* eslint-disable prettier/prettier */
import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';
import authenticate from '../middlewares/auth.js'
const router = Router();

router.get('/students', authenticate(["admin"]),filterControllers.getAllStudents);
router.get('/student/:roll_no',authenticate(["admin","student"]), filterControllers.getStudent);
router.get('/student/dept/:dept',authenticate(["admin"]), filterControllers.getStudentsByDept);
router.get('/drive',authenticate(["student"]),filterControllers.getAllDrives)
router.get('/edrive/:roll_no',authenticate(["student"]),filterControllers.getEligibleDrives)
router.post('/dashboard',authenticate(["admin"]),filterControllers.getDashboard);
router.post(
  '/dashboard/:page&:limit',authenticate(["admin"]),
  filterControllers.getPaginatedDashboard,
);

router.get('/company',authenticate(["admin"]), filterControllers.getAllCompanies);

router.get('/top10student',authenticate(["admin"]), filterControllers.getTopPlacedStudents);
router.get(
  '/studentsplacedcompanywise',authenticate(["admin"]),
  filterControllers.getSelectedStudentsCompanyWise,
);
router.get(
  '/studentsplacedlpawise',authenticate(["admin"]),
  filterControllers.getSelectedStudentsLpaWise,
);
router.get('/placedByDept',authenticate(["admin"]), filterControllers.getStudentsPlacedByDept);

export default router;
