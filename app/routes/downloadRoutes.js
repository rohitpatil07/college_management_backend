import { Router } from 'express';
import downloadControllers from '../controllers/downloadControllers.js';
const router = Router();

router.post('/excel', downloadControllers.downloadExcel);
router.post('/csv', downloadControllers.downloadCSV);

export default router;
