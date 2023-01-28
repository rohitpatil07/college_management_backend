import { Router } from 'express';
import filterRoutes from './filterRoutes.js';
import formRoutes from './formRoutes.js';
import downloadRoutes from './downloadRoutes.js';
import deleteRoutes from './deleteRoutes.js';

const router = Router();

router.use('/filter', filterRoutes);
router.use('/form', formRoutes);
router.use('/download', downloadRoutes);
router.use('/delete', deleteRoutes);

export default router;
