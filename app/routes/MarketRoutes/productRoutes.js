import { Router } from 'express';
import productControllers from '../../controllers/MarketControllers/productControllers.js';
import authenticate from '../../middlewares/auth.js';

const router = Router();

router.get(
  '/',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.getProducts,
);
router.post(
  '/product',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.getProduct,
);
router.post(
  '/addproduct',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.createProduct,
);
router.post(
  '/buyproduct',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.buyProduct,
);
router.post(
  '/transactions',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.getTransactions,
);
router.post(
  '/product_name',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.getProducstByName,
);
router.post(
  '/category',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.getProductsByCategory,
);
router.post(
  '/update',
  authenticate(['student', 'faculty', 'admin', 'lms_admin']),
  productControllers.updateProduct,
);

router.post(
  '/delete',
  authenticate(['student,faculty']),
  productControllers.deleteProduct,
);

export default router;
