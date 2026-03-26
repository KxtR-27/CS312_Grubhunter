import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) throw new Error('Local environment variable "MONGO_URI" is missing.');

let connection = global.mongoose;

if (!connection) {
	connection = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
	if (connection.conn) {
		return connection.conn;
	}

	if (!connection.promise) {
		await mongoose.disconnect();

		connection.promise = mongoose
			.connect(mongoURI)
			.then(mongoose => mongoose)
			.catch(error => {
				throw new Error(String(error));
			});
	}

	try {
		connection.conn = await connection.promise;
	} catch (error) {
		console.error(error);
	}

	return connection.conn;
};

export default dbConnect;
