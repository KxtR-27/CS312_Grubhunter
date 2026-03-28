import LocationDetails from "@/grubhunter-application/components/location-details";
import dbConnect from "@/middleware/mongodb-connection";
import { Location } from "@/mongoose/locations/schema";
import { findLocationsByID } from "@/mongoose/locations/services";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";

interface LocationDetailsContext extends GetServerSidePropsContext {
	params: { locationId: string };
}

const LocationDetailsPage: NextPage = ({
	serializedLocation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const location = serializedLocation as Location;
	const title = location.name;

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main>
				<LocationDetails location={location} />
			</main>
		</>
	);
};

const getServerSideProps: GetServerSideProps = async context => {
	const id = (context as LocationDetailsContext).params.locationId;

	await dbConnect();
	const locations = await findLocationsByID({ location_id: id });
	if (!locations || locations.length === 0) return { notFound: true };

	// ↓ result can technically be an object or an array. this accounts for that. ↓
	const location = Array.isArray(locations) ? locations[0] : (locations as Location);
	// ↓ widely regarded as best practice. serializes an object. ↓
	const serializedLocation = JSON.parse(JSON.stringify(location));

	return { props: { serializedLocation } };
};

export default LocationDetailsPage;
export { getServerSideProps };
