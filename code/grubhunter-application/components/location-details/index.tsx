import { Location } from "@/mongoose/locations/schema";
import styles from "./index.module.css";

interface LoactionDetailsProps {
	location: Location;
}

const LocationDetails = ({ location }: LoactionDetailsProps) => {
	if (!location) return;

	const { name, address, zipcode, borough, cuisine, grade } = location;

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
		</div>
	);
};

export default LocationDetails;
