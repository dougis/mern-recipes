var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var cookbooksModel = new Schema({
  name: { type: String, required: true },
  chapters: [
    {
      name: { type: String, required: true },
      order: { type: Number, required: true },
      recipes: [
        {
          name: { type: String, required: true },
          recipe_key: { type: Number, required: true },
          recipe_id: { type: Schema.Types.ObjectId, required: true },
          required: true,
        },
      ],
      required: true,
    },
  ],
});
