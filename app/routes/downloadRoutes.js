import { Router } from 'express';
import downloadControllers from '../controllers/downloadControllers.js';
import authenticate from '../middlewares/auth.js';
const router = Router();

router.post(
  '/excel',
  authenticate(['admin']),
  downloadControllers.downloadExcel,
);
router.post('/csv', authenticate(['admin']), downloadControllers.downloadCSV);

router.get(
  '/resume/:roll_no',
  authenticate(['student']),
  downloadControllers.resumeDownload,
);
router.post('/zip', authenticate(['student']), downloadControllers.zipDownload);

export default router;
