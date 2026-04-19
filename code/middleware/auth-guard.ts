import { JWT } from "next-auth/jwt";
import { GraphQLError } from "graphql/error";

interface MutationParams {
	user_id: string;
	location_id: string;
}

interface ResolverContext {
	token: JWT;
}

const authGuard = (params: MutationParams, context: ResolverContext): boolean | Error => {
	if (!context || !context.token || !context.token.fdlst_private_userId)
		return new GraphQLError("UNAUTHENTICATED", { extensions: { http_status: 500 } });

    if (context.token.fdlst_private_userId !== params.user_id)
		return new GraphQLError("UNAUTHORIZED", { extensions: { http_status: 500 } });

    return true;
};

export default authGuard;