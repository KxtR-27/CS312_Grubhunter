import mongoose, { model } from "mongoose";
import locationSchema from "./schema";

const locationModel = mongoose.models.Location || model<Location>("Location", locationSchema)

export default locationModel;