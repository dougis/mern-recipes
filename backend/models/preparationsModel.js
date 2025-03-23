const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const preparationsModel = new Schema({
  preparation: { type: String, required: true },
});
