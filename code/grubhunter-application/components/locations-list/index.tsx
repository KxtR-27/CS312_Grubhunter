import { Location } from "@/mongoose/locations/schema";
import LocationsListItem from "../locations-list-item";
import styles from "./index.module.css";

interface LocationsListProps {
	locations: Location[];
}

const LocationsList = ({ locations }: LocationsListProps) => {
	return (
		<ul className={styles.root}>
			{locations.map(location => (
				<LocationsListItem location={location} key={location.location_id} />
			))}
		</ul>
	);
};

export default LocationsList;
