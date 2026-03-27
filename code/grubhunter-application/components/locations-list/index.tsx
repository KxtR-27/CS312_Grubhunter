import { Location } from "@/mongoose/locations/schema";
import LocationsListItem from "../locations-list-item";

interface LocationsListProps {
	locations: Location[];
}

const LocationsList = ({ locations }: LocationsListProps) => {
	return (
		<ul>
			{locations.map(location => (
				<LocationsListItem location={location} key={location.location_id} />
			))}
		</ul>
	);
};

export default LocationsList;
