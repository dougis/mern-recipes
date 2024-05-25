var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var classificationsModel = new Schema({
  classification: { type: String, required: true },
});
