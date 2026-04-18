import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { hash } from "crypto";
import { NextApiHandler } from "next";

// the object-based `crypto.createHash()` is more expensive for data <= 5MB
// `hash()` is less expensive for data <= 5MB but cannot handle streamed input
const hashEmail = (email: string) => hash("sha256", email);

const handler: NextApiHandler = async (req, res) => {
	const authOptions: AuthOptions = {
		providers: [
			GitHubProvider({
				clientId: process.env.GITHUB_CLIENT_ID!,
				clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			}),
		],
		callbacks: {
			jwt({ token }) {
				const email = token.email;
				const userId = token.fdlst_private_userId;

				if (email && !userId) {
					token.fdlst_private_userId = hashEmail(email);
				}

				return token;
			},
			session({ session }) {
				const email = session.user.email;
				const userId = session.user.fdlst_private_userId;

				if (email && !userId) {
					session.user.fdlst_private_userId = hashEmail(email);
				}
                
				return session;
			},
		},
	};

	return NextAuth(req, res, authOptions);
};

export default handler;