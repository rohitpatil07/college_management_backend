/* eslint-disable prettier/prettier */
import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';
import authenticate from '../middlewares/auth.js'
const router = Router();

router.get('/students', authenticate(["admin"]),filterControllers.getAllStudents);
router.get('/student/:roll_no',authenticate(["admin","student"]), filterControllers.getStudent);
router.get('/student/dept/:dept',authenticate(["admin"]), filterControllers.getStudentsByDept);
router.get('/student/applied/:roll_no',authenticate(["student"]), filterControllers.getAppliedDrives);
router.get('/student/offer/:roll_no',authenticate(["student","admin"]), filterControllers.getRequestedOffers);
router.get('/drive',authenticate(["admin"]),filterControllers.getAllDrives);
router.get('/onedrive/:drive_id',authenticate(["admin","company","student"]),filterControllers.getDrive);
router.get('/edrive/:roll_no',authenticate(["student"]),filterControllers.getEligibleDrives);
router.post('/dashboard',authenticate(["admin"]),filterControllers.getDashboard);
router.post(
  '/dashboard/:page&:limit', authenticate(["admin"]),
  filterControllers.getPaginatedDashboard,
);
router.get('/admin/alloffers/:company',
  authenticate(["admin", "company"]),
  filterControllers.getAllOffers
);
router.get('/company', authenticate(["admin"]), filterControllers.getAllCompanies);
router.get('/onecompany/:company', authenticate(["admin", "company"]), filterControllers.getCompany);
router.get('/company/drive/:company', authenticate(["admin", "company"]), filterControllers.getCompanyDrive);
router.get('/company/appliedstudents/:driveid', authenticate(["admin", "company"]), filterControllers.getStudentsForDrive);
router.get('/company/clickedstudent/:roll_no', authenticate(["admin", "company"]), filterControllers.getclickedStudentForDrive);
router.get('/company/drives', authenticate(["admin", "company"]), filterControllers.getCompDriveData);

router.get('/top10student', authenticate(["admin"]), filterControllers.getTopPlacedStudents);
router.get(
  '/studentsplacedcompanywise', authenticate(["admin"]),
  filterControllers.getSelectedStudentsCompanyWise,
);
router.get(
  '/studentsplacedlpawise', authenticate(["admin"]),
  filterControllers.getSelectedStudentsLpaWise,
);
router.get('/placedByDept', authenticate(["admin"]), filterControllers.getStudentsPlacedByDept);

router.post("/notify", authenticate(["company","admin"]), filterControllers.notify);

export default router;
