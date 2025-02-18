import express from "express";
import { sign_up, signin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/sign_up", sign_up);
router.post("/signin", signin);

export default router;
