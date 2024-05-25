var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var preparationsModel = new Schema({
  preparation: { type: String, required: true },
});
