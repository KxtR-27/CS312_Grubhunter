import mongoose, { model } from "mongoose";
import locationSchema from "./schema";

const locationModel = mongoose.models.locations || model<Location>("locations", locationSchema)

export default locationModel;