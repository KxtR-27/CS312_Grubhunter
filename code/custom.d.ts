import mongoose from "mongoose";
import type { DefaultSession } from "next-auth";

declare global {
	var mongoose: {
		conn: unknown;
		promise: unknown;
	};
}

declare module "next-auth" {
	interface Session {
		user: {
			fdlst_private_userId: string;
		} & DefaultSession["user"];
	}
}

declare module "*.css"

export {}