import mongoose from "mongoose";

const dbConnect = async () => {
	const mongoURI = process.env.MONGO_URI;

	if (!mongoURI)
		throw new Error('Local environment variable "MONGO_URI" is missing.');

	global.mongoose = mongoose.connection 
            ? mongoose.connection 
            : await mongoose.connect(mongoURI);
};
