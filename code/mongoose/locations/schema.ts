import { InferSchemaType, Schema } from "mongoose";

const locationSchema = new Schema({
	address: { type: String, required: true },
	zipcode: { type: String, required: true },
	borough: { type: String, required: true },
	cuisine: { type: String, required: true },
	grade: { type: String, required: true },
	name: { type: String, required: true },
	on_wishlist: { type: [String], required: true },
	location_id: { type: String, required: true },
});

export type Location = InferSchemaType<typeof locationSchema>;

export default locationSchema;
