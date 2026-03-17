type GetByID = (id: string) => Promise<Location>;

type filterOnWishlist = () => Promise<Array<Location>>;

export type { getByID, filterOnWishlist };