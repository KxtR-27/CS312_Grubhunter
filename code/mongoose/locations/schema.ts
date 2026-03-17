import { InferSchemaType, Schema } from "mongoose";

const locationSchema = new Schema({
    address: String,
    zipcode: String,
    borough: String,
    cuisine: String,
    grade: String,
    name: String,
    on_wishlist: Array<String>,
    location_id: String,
})

export type Location = InferSchemaType<typeof locationSchema>;

export default locationSchema