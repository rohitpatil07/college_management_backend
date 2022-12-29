import { Router } from 'express';
import authControllers from '../controllers/authControllers.js';

const router = Router();
router.post('/login', authControllers.login);
router.post('/reset_password', authControllers.reset_password);

export default router;
