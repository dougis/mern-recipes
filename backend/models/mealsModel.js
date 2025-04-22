import mongoose from "mongoose";
const Schema = mongoose.Schema;
const mealsModel = new Schema({ meal: { type: String, required: true } });
export default mongoose.model("meals", mealsModel);
