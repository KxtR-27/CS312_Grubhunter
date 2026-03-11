import mongoose from "mongoose";

// NOTE: this part is incomplete.
// We have yet to discuss this portion of the activity.
// We have only discussed through `grubHunterActivity1.pdf`,
// but this part pertains to `grubHunterActivity**2**.pdf`.
const dbConnect = async () => {
	const mongoURI = process.env.MONGO_URI;

	if (!mongoURI)
		throw new Error('Local environment variable "MONGO_URI" is missing.');

	global.mongoose = mongoose.connection 
            ? mongoose.connection 
            : await mongoose.connect(mongoURI);
};
