import dbConnect from "@/middleware/mongodb-connection";
import { LocationFilter } from "@/mongoose/locations/custom";
import { findLocationsByID } from "@/mongoose/locations/services";
import { NextApiHandler, NextApiResponse } from "next";

await dbConnect();

const handler: NextApiHandler = async (_req, res): Promise<NextApiResponse | void> => {
    const filter: LocationFilter = { location_id: ["56018"]}
	const data = await findLocationsByID(filter);
	return res.status(200).json(data);
};

export default handler;
