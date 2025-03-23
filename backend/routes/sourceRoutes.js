import express from "express";
import {
  getSources,
  getSourceById,
  createSource,
  updateSource,
  deleteSource,
} from "../controllers/sourceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validateSource } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.route("/").get(getSources);

router.route("/:id").get(getSourceById);

router.route("/").post(protect, admin, validateSource, createSource);

router
  .route("/:id")
  .put(protect, admin, validateSource, updateSource)
  .delete(protect, admin, deleteSource);

export default router;
