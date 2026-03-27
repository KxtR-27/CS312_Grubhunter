import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

import { Location } from "../mongoose/locations/schema";

import LocationsList from "../grubhunter-application/components/locations-list";
import dbConnect from "@/middleware/mongodb-connection";
import { findAllLocations } from "@/mongoose/locations/services";

const StartPage: NextPage = ({ locationsString }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const parsedLocations: Location[] = JSON.parse(locationsString);
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
		.then(locations => JSON.stringify(locations as Location[]))
		.then(locationsString => ({ props: { locationsString } }));
};

export default StartPage;
export { getStaticProps };
