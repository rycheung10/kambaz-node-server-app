import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("PazzaModel", schema); // model name can be anything
export default model;
