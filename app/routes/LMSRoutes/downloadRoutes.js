import { Router } from 'express';
import downloadControllers from '../../controllers/LMSControllers/downloadController.js';

const router = Router();

router.get('/getmaterial/:reading_material_id', downloadControllers.downloadMaterial);

export default router;