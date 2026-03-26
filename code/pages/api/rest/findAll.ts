import dbConnect from "@/middleware/mongodb-connection";
import { findAllLocations } from "@/mongoose/locations/services";
import { NextApiHandler, NextApiResponse } from "next";

await dbConnect();

const handler: NextApiHandler = async (_req, res): Promise<NextApiResponse | void> => {
	const data = await findAllLocations();
	return res.status(200).json(data);
};

export default handler;
