import { Router } from 'express';
import filterRoutes from './filterRoutes.js';
import formRoutes from './formRoutes.js';
import downloadRoutes from './downloadRoutes.js';
import imageRoutes from './imageRoutes.js';

const router = Router();

router.use('/filter', filterRoutes);
router.use('/add', formRoutes);
router.use('/download', downloadRoutes);
router.use('/image', imageRoutes);

export default router;
