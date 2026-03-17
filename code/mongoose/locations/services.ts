import type { filterOnWishlist, getByID } from "./custom";
import locationModel from "./model";

const getAllLocations = async () => {
	try {
		return await locationModel.find({});
	} catch (error) {
		console.log(error);
		return [];
	}
};

const getByID: getByID = async (id: string) => {
	try {
		return await locationModel.findOne({ location_id: id });
	} catch (error) {
		console.log(error);
		return [];
	}
};

const getOnWishlist: filterOnWishlist = async () => {
	try {
		return await locationModel.find({ on_wishlist: true });
	} catch (error) {
		console.log(error);
		return [];
	}
};

const addToWishlist = async (id: string) => {
	try {
		await locationModel.updateOne({ location_id: id }, { on_wishlist: true });
        return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const removeFromWishlist = async (id: string) => {
	try {
		await locationModel.updateOne({ location_id: id }, { on_wishlist: false });
        return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export { getAllLocations, getByID, getOnWishlist, addToWishlist, removeFromWishlist };
