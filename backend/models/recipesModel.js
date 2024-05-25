var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recipesModel = new Schema({
  recipe_key: { type: Number, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  servings: { type: Number, required: true },
  notes: { type: Schema.Types.Mixed },
  classification: { type: String, required: true },
  source: { type: String, required: true },
  meals: [{ type: String, required: true }],
  preparations: [{ type: String, required: true }],
  courses: [{ type: String, required: true }],
});
module.exports = mongoose.model("recipes", recipesModel);
