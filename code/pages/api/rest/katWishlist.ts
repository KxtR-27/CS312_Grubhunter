import dbConnect from "@/middleware/mongodb-connection";
import { onWishlist } from "@/mongoose/locations/services";
import { NextApiHandler, NextApiResponse } from "next";

await dbConnect();

const handler: NextApiHandler = async (_req, res): Promise<NextApiResponse | void> => {
	const data = await onWishlist("kat");
	return res.status(200).json(data);
};

export default handler;
