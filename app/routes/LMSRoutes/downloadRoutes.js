import { Router } from 'express';
import authenticate from '../../middlewares/auth.js';
import downloadControllers from '../../controllers/LMSControllers/downloadController.js';

const router = Router();

router.get(
  '/getassignment/:assignment_id',
  authenticate(['faculty', 'student']),
  downloadControllers.downloadAssignment,
);

router.get(
  '/getmaterial/:reading_material_id',
  authenticate(['faculty', 'student']),
  downloadControllers.downloadMaterial,
);

router.get(
  '/getsubmission/:assignment_id/:roll_no',
  authenticate(['faculty', 'student']),
  downloadControllers.downloadSubmission,
)

router.get(
  '/getzip/:assignment_id',
  authenticate(['faculty']),
  downloadControllers.downloadZip,
)
export default router;
