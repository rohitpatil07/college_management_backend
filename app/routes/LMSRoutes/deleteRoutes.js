import { Router } from 'express';
import deleteController from '../../controllers/LMSControllers/deleteController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.post(
  '/deleteDILO',
  authenticate(['faculty']),
  deleteController.deleteDILO,
);

router.get(
  '/deleteforum/:forum_id',
  authenticate(['faculty']),
  deleteController.deleteForum,
)

export default router;