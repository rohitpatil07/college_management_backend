import { Router } from "express";
import filterRoutes from "./filterRoutes.js";
const router = Router();
router.use("/filter", filterRoutes);

export default router;
