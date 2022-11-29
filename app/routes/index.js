import { Router } from 'express';
import filterRoutes from './filterRoutes.js';
import formRoutes from './formRoutes.js';
import downloadRoutes from './downloadRoutes.js';
import authRoutes from './authRoutes.js';
const router = Router();

router.use('/filter', filterRoutes);
router.use('/add', formRoutes);
router.use('/download', downloadRoutes);
router.use('/auth',authRoutes);

export default router;
