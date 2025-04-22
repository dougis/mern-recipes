import mongoose from "mongoose";
const Schema = mongoose.Schema;
const sourcesModel = new Schema({ source: { type: String, required: true } });
export default mongoose.model("sources", sourcesModel);
