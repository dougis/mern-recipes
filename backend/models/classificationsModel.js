import mongoose from "mongoose";
const Schema = mongoose.Schema;
const classificationsModel = new Schema({
  classification: { type: String, required: true },
});
export default mongoose.model("classifications", classificationsModel);
