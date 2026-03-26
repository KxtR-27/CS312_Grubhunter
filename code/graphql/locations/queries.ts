import { LocationFilter } from "@/mongoose/locations/custom";
import { findAllLocations, findLocationsByID, onWishlist } from "@/mongoose/locations/services";

interface OnUserWishlistInputBecauseGraphQLWrapsEverythingInAnObject {
	user_id: string;
}

const locationQueries = {
	allLocations: async () => await findAllLocations(),
	locationsById: async (_: unknown, location_id: LocationFilter) => await findLocationsByID(location_id),
	onUserWishlist: async (_: unknown, { user_id }: OnUserWishlistInputBecauseGraphQLWrapsEverythingInAnObject) =>
		await onWishlist(user_id),
};

export { locationQueries };
