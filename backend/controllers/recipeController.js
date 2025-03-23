import asyncHandler from "express-async-handler";
import Recipe from "../models/recipesModel.js";

// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

// @desc    Fetch single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private/Admin
const createRecipe = asyncHandler(async (req, res) => {
  const recipe = new Recipe({
    recipe_key: req.body.recipe_key,
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    servings: req.body.servings,
    notes: req.body.notes,
    classification: req.body.classification,
    source: req.body.source,
    meals: req.body.meals,
    preparations: req.body.preparations,
    courses: req.body.courses,
  });

  const createdRecipe = await recipe.save();
  res.status(201).json(createdRecipe);
});

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private/Admin
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    recipe.recipe_key = req.body.recipe_key || recipe.recipe_key;
    recipe.name = req.body.name || recipe.name;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.instructions = req.body.instructions || recipe.instructions;
    recipe.servings = req.body.servings || recipe.servings;
    recipe.notes = req.body.notes || recipe.notes;
    recipe.classification = req.body.classification || recipe.classification;
    recipe.source = req.body.source || recipe.source;
    recipe.meals = req.body.meals || recipe.meals;
    recipe.preparations = req.body.preparations || recipe.preparations;
    recipe.courses = req.body.courses || recipe.courses;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private/Admin
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    await recipe.deleteOne();
    res.json({ message: "Recipe removed" });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

export { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };
