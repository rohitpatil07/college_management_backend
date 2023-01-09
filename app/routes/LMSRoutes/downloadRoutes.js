import { Router } from 'express';
import authenticate from '../../middlewares/auth.js'
import downloadControllers from '../../controllers/LMSControllers/downloadController.js';

const router = Router();

router.get('/getmaterial/:reading_material_id',authenticate(["faculty","student"]), downloadControllers.downloadMaterial);

export default router;