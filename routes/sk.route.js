import express from "express";
import {
  skAddNew,
  skDelete,
  skGetAll,
  skUpdate,
} from "../controllers/sk.controller.js";

const router = express.Router();

router.post("/sk/add-sk", skAddNew);

router.get("/sk", skGetAll);
router.delete("/sk/:id", skDelete);
router.put("/sk/:id", skUpdate);

export default router;
