import LocationDetails from "@/grubhunter-application/components/location-details";
import dbConnect from "@/middleware/mongodb-connection";
import { Location } from "@/mongoose/locations/schema";
import { findLocationsByID } from "@/mongoose/locations/services";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";

interface LocationDetailsContext extends GetServerSidePropsContext {
    params: { locationId: string }
}

const LocationDetailsPage: NextPage = ({ serializableLocation }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const location = serializableLocation as Location;
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
    const id = (context as LocationDetailsContext).params.locationId

    await dbConnect()
    const locations = await findLocationsByID({ location_id: id })
    if (!locations || locations.length === 0) return { notFound: true }

    const location = Array.isArray(locations) ? locations[0] : (locations as Location)
    const serializableLocation = JSON.parse(JSON.stringify(location))
    return { props: { serializableLocation }}
};

export default LocationDetailsPage;
export { getServerSideProps };
