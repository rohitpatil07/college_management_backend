import { Router } from 'express';
import imageControllers from '../controllers/imageControllers.js';

const router = Router();

router.get('/profiledownload/:roll_no', imageControllers.downloadProfileImage);
router.post('/profileupload/:roll_no', imageControllers.uploadProfileImage);
router.get('/offerdownload/:offer_id', imageControllers.downloadOfferLetter);
router.post('/offerupload/:offer_id', imageControllers.uploadOfferLetter);

export default router;