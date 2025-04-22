import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validateRecipe } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.route("/").get(getRecipes);

router.route("/:id").get(getRecipeById);

router.route("/").post(protect, admin, validateRecipe, createRecipe);

router
  .route("/:id")
  .put(protect, admin, validateRecipe, updateRecipe)
  .delete(protect, admin, deleteRecipe);

export default router;
