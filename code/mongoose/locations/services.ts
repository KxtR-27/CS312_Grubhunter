import { QueryOptions } from "mongoose";
import type { LocationFilter, WishlistFilter } from "./custom";
import locationModel from "./model";
import { Location } from "./schema";

type MongooseResult = Promise<Location[] | []>;

const findLocations = async (filter: LocationFilter | WishlistFilter | {}): MongooseResult => {
	try {
		const data = await locationModel.find(filter);
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const findAllLocations = async (): MongooseResult => {
	const filter = {};
	return await findLocations(filter);
};

const findLocationsByID = async (location_ids: LocationFilter): MongooseResult => {
	const filter = location_ids;
	return await findLocations(filter);
};

const onWishlist = async (user_id: string) => {
	const filter: WishlistFilter = { on_wishlist: { $in: [user_id] } };
	return await findLocations(filter);
};

const updateWishlist = async (location_id: string, user_id: string, action: string): MongooseResult => {
	const filter = { location_id: location_id };
	const options: QueryOptions = { upsert: true, returnDocument: "after" };
	let update = {};

	if (action == "add") update = { $push: { on_wishlist: user_id } };
	else if (action == "remove") update = { $pull: { on_wishlist: user_id } };

	try {
		await locationModel.findOneAndUpdate(filter, update, options);
		return (await findLocationsByID({ location_id: location_id })) as Location[];
	} catch (error) {
		console.log(error);
		return [];
	}
};

export { findAllLocations, findLocationsByID, onWishlist, updateWishlist };
