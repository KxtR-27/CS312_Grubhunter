import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import resolvers from "@/graphql/locations/resolvers";
import gqlSchema from "@/graphql/locations/schema.gql";
import dbConnect from "@/middleware/mongodb-connection";
import { getToken } from "next-auth/jwt";

const server = new ApolloServer<BaseContext>({ resolvers, typeDefs: gqlSchema });

const handler = startServerAndCreateNextHandler(server, { context: async (req) => {
    const token = await getToken({req});
    return { token }
}});

const allowCors = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader("Allow", "POST")
		.setHeader("Access-Control-Allow-Origin", "*")
		.setHeader("Access-Control-Allow-Methods", "POST")
		.setHeader("Access-Control-Allow-Headers", "*")
		.setHeader("Access-Control-Allow-Credentials", "true");

	if (req.method === "OPTIONS") res.status(200).end();

	return await fn(req, res);
};

const connectDB = (func: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();
	return await func(req, res);
};

export default connectDB(allowCors(handler));
