import { updateWishlist } from "@/mongoose/locations/services";

interface WishlistInput {
	user_id: string;
	location_id: string;
}

const locationMutations = {
	addWishlist: async (_: unknown, param: WishlistInput, _context: {}) => {
		return await updateWishlist(param.location_id, param.user_id, "add");
	},
	removeWishlist: async (_: unknown, param: WishlistInput, _context: {}) => {
		return await updateWishlist(param.location_id, param.user_id, "remove");
	},
};

export { locationMutations };
