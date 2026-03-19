import { QueryOptions } from "mongoose";
import type { LocationFilter, WishlistFilter } from "./custom";
import locationModel from "./model";
import { Location } from "./schema";

type GraphQLResult = Promise<Location | Location[]>;

const findLocations = async (filter: LocationFilter | WishlistFilter | {}): GraphQLResult => {
    try {
        return await locationModel.find(filter)
    }
    catch (error) {
        console.log(error);
        return [];
    }
};

const findAllLocations = async (): GraphQLResult => {
	return await findLocations({});
};

const findLocationsByID = async (location_ids: string[]): GraphQLResult => {
	const filter = { location_id: location_ids };
	return await findLocations(filter);
};

const onUserWishlist = async (user_id: string) => {
	const filter: WishlistFilter = { on_wishlist: { $in: [user_id] } };
	return await findLocations(filter);
};

const updateWishlist = async (location_id: string, user_id: string, action: string): GraphQLResult => {
	const filter = { location_id: location_id };
	const options: QueryOptions = { upsert: true, returnDocument: "after" };
	let update = {};

	if (action == "add") 
        update = { $push: { on_wishlist: user_id } };
	else if (action == "remove")
        update = { $pull: { on_wishlist: user_id } };

    try {
	    return await locationModel.findOneAndUpdate(filter, update, options) as Location[]
    }
    catch (error) {
        console.log(error);
        return {};
    }
};

export { findAllLocations, findLocationsByID, onUserWishlist, updateWishlist };
