declare type LocationFilter = { location_id: string | string[] };

declare type WishlistFilter = {
	on_wishlist: {
		$in: string[];
	};
};

export type { LocationFilter, WishlistFilter };
