import { Router } from 'express';
import deleteController from '../../controllers/LMSControllers/deleteController.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.post(
  '/deleteDILO',
  authenticate(['faculty','lms_admin']),
  deleteController.deleteDILO,
);

router.get(
  '/deleteforum/:forum_id',
  authenticate(['faculty','student']),
  deleteController.deleteForum,
)

router.get(
  '/form/:form_id',
  authenticate(['lms_admin']),
  deleteController.deleteForm,
)

export default router;