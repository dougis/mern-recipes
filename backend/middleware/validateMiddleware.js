import Joi from "joi";

export const validateRecipe = (req, res, next) => {
  const schema = Joi.object({
    recipeKey: Joi.string().required().messages({
      "string.empty": "Recipe key is required",
      "any.required": "Recipe key is required",
    }),
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    ingredients: Joi.string().required().messages({
      "string.empty": "Ingredients are required",
      "any.required": "Ingredients are required",
    }),
    instructions: Joi.string().required().messages({
      "string.empty": "Instructions are required",
      "any.required": "Instructions are required",
    }),
    servings: Joi.number().required().min(1).messages({
      "number.base": "Servings must be a number",
      "number.min": "Servings must be at least 1",
      "any.required": "Servings are required",
    }),
    classification: Joi.string().required().messages({
      "string.empty": "Classification is required",
      "any.required": "Classification is required",
    }),
    source: Joi.string().required().messages({
      "string.empty": "Source is required",
      "any.required": "Source is required",
    }),
    notes: Joi.string().allow("").optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }
  next();
};

export const validateSource = (req, res, next) => {
  const schema = Joi.object({
    source: Joi.string().required().messages({
      "string.empty": "Source name is required",
      "any.required": "Source name is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }
  next();
};
