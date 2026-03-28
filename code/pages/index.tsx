import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

import { Location } from "../mongoose/locations/schema";

import LocationsList from "../grubhunter-application/components/locations-list";
import dbConnect from "@/middleware/mongodb-connection";
import { findAllLocations } from "@/mongoose/locations/services";

const StartPage: NextPage = ({ serializedLocations }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const parsedLocations = serializedLocations as Location[];
	const title = "Start Page";

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main>
				<LocationsList locations={parsedLocations} />
			</main>
		</>
	);
};

const getStaticProps: GetStaticProps = async _context => {
	return await dbConnect()
		.then(_ => findAllLocations())
		.then(data => data as Location[])
		// ↓ widely regarded as best practice. serializes an object. ↓
		.then(locations => JSON.parse(JSON.stringify(locations)))
		.then(serializedLocations => ({ props: { serializedLocations } }));
};

export default StartPage;
export { getStaticProps };
