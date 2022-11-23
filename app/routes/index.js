import { Router } from 'express';
import filterRoutes from './filterRoutes.js';
import formRoutes from './formRoutes.js';
const router = Router();

router.use('/filter', filterRoutes);
router.use('/add', formRoutes);

export default router;
