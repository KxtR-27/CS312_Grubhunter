import { Location } from "@/mongoose/locations/schema";
import styles from "./index.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "../button";

interface LoactionDetailsProps {
	location: Location;
}

const LocationDetails = ({ location }: LoactionDetailsProps) => {
	if (!location) return;

	const { name, address, zipcode, borough, cuisine, grade, on_wishlist, location_id: locationId } = location;

	// *** session ***
	const { data: session, status } = useSession();
	const userId = session?.user.fdlst_private_userId;

	// *** wishlist action states ***
	const [isOnWishlist, setOnWishlist] = useState(false);
	const [isLoading, setLoading] = useState(false);

    // get actual isOnWishlist state on first render
	useEffect(() => setOnWishlist(!!userId && on_wishlist.includes(userId)), []);

	// *** wishlist graphql queries ***
	const wishlistAddQuery = `
        mutation AddWishlist($locationId: String!, $userId: String!) {
            addWishlist(location_id: $locationId, user_id: $userId) {
                location_id
                on_wishlist
            }
        }
    `;
	const wislistRemoveQuery = `
        mutation RemoveWishlist($locationId: String!, $userId: String!) {
            removeWishlist(location_id: $locationId, user_id: $userId) {
                location_id
                name
                on_wishlist
            }
        }
    `;

	// *** wishlist button action ***
	const wishlistAction = async (locationId: string, userId: string) => {
		if (isLoading) return;

		setLoading(true);
		const action = isOnWishlist ? "remove" : "add";

		await fetch("http://localhost:3000/api/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json    " },
			body: JSON.stringify({
				query: action === "add" ? wishlistAddQuery : wislistRemoveQuery,
				variables: {
					locationId,
					userId,
				},
			}),
		})
            .then(response => setOnWishlist((response.status === 200) ? action === "add" : isOnWishlist))
            .then(() => setLoading(false))
            .catch(error => console.log(error));

		setLoading(false);
	};

	return (
		<div className={styles.root}>
			<h2>{name}</h2>
			<ul className={styles.root}>
				<li className={styles.li}>{address}</li>
				<li className={styles.li}>{zipcode}</li>
				<li className={styles.li}>{borough}</li>
				<li className={styles.li}>{cuisine}</li>
				<li className={styles.li}>{grade}</li>
			</ul>
            {/* if a valid user is logged in, show the wishlist button */}
			{status === "authenticated" && userId ? (
				<Button
					disabled={isLoading}
					children={[<label>{isOnWishlist ? "Remove from your Wishlist" : "Add to your Wishlist"}</label>]}
					variant={isOnWishlist ? "outline" : "blue"}
					clickHandler={() => wishlistAction(locationId, userId)}
				/>
			) : undefined}
		</div>
	);
};

export default LocationDetails;
