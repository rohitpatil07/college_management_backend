import { Router } from "express";
import filterControllers from "../controllers/filterControllers.js";

const router = Router();

router.get("/", filterControllers.getAllStudents);

export default router;
