import Link from "next/link";
import { Location } from "@/mongoose/locations/schema";
import styles from "./index.module.css";

interface LocationListItemProps {
	location: Location;
}

const LocationsListItem = ({ location }: LocationListItemProps) => {
	return (
		<li>
			<Link href={`/location/${location.location_id}`} className={styles.root}>
                <div className="name"><b>{location.name}</b></div>
                <div className="cuisine">Cuisine: {location.cuisine}</div>
                <div className="borough">Borough: {location.borough}</div>
            </Link>
		</li>
	);
};

export default LocationsListItem;
