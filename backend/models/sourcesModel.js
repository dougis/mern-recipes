var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sourcesModel = new Schema({ source: { type: String, required: true } });
