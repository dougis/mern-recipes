var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mealsModel = new Schema({ meal: { type: String, required: true } });
