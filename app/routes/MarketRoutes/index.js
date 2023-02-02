import { Router } from 'express';
import productRoutes from './productRoutes.js';
import lostItemRoutes from './lostItemRoutes.js';

const router = Router();
router.use('/products', productRoutes);
router.use('/lost_items', lostItemRoutes);

export default router;
