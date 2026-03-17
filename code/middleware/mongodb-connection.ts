import mongoose from "mongoose";

const dbConnect = async () => {
	const mongoURI = process.env.MONGO_URI;

	if (!mongoURI) 
        throw new Error('Local environment variable "MONGO_URI" is missing.');

	const alreadyConnected = Boolean(mongoose.connection);

	global.mongoose = alreadyConnected 
        ? mongoose.connection 
        : await mongoose.connect(mongoURI);

	console.log(`global.mongoose is using ${alreadyConnected ? "an existing" : "a new"} mongodb connection.`);
};

export default dbConnect;
