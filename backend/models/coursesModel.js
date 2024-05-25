var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var coursesModel = new Schema({ course: { type: String, required: true } });
