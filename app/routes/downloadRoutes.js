import { Router } from 'express';
import downloadControllers from '../controllers/downloadControllers.js';
const router = Router();

router.post('/excel', downloadControllers.downloadExcel);
router.post('/csv', downloadControllers.downloadCSV);
router.get('/resume/:roll_no', downloadControllers.resumeDownload)
router.post('/zip', downloadControllers.zipDownload);

export default router;
