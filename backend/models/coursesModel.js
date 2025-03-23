import mongoose from "mongoose";
const Schema = mongoose.Schema;
const coursesModel = new Schema({ course: { type: String, required: true } });
export default mongoose.model("courses", coursesModel);
