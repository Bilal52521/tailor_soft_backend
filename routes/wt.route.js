import express from "express";
import {
  wtAddNew,
  wtDelete,
  wtGetAll,
  wtUpdate,
} from "../controllers/wt.controller.js";

const router = express.Router();

router.post("/wt/add-sk", wtAddNew);

router.get("/wt", wtGetAll);
router.delete("/wt/:id", wtDelete);
router.put("/wt/:id", wtUpdate);

export default router;
