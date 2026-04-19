import { updateWishlist } from "@/mongoose/locations/services";
import authGuard from "@/middleware/auth-guard";
import { JWT } from "next-auth/jwt";

interface WishlistInput {
	user_id: string;
	location_id: string;
}

interface WishlistContext {
	token: JWT;
}

const locationMutations = {
	addWishlist: async (_: unknown, param: WishlistInput, context: WishlistContext) => {
        const guard = authGuard(param, context);
        if (guard !== true) return guard as Error; 

		return await updateWishlist(param.location_id, param.user_id, "add");
	},
	removeWishlist: async (_: unknown, param: WishlistInput, context: WishlistContext) => {
        const guard = authGuard(param, context);
        if (guard !== true) return guard as Error; 

		return await updateWishlist(param.location_id, param.user_id, "remove");
	},
};

export { locationMutations };
