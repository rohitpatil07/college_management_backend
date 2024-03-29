import { Router } from 'express';
import authControllers from '../controllers/authControllers.js';

const router = Router();
router.post('/login', authControllers.login);
router.post('/reset_password', authControllers.reset_password);
router.post('/forgot_mail', authControllers.forgot_mail);
router.post('/forgot_password', authControllers.forgot_password);
router.get('/user_data', authControllers.user_data);
router.get('/logout', authControllers.logout);

export default router;
