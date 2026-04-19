import LocationsList from "@/grubhunter-application/components/locations-list";
import dbConnect from "@/middleware/mongodb-connection";
import { onWishlist } from "@/mongoose/locations/services";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import type { Location } from "@/mongoose/locations/schema";

interface WishlistDetailsContext extends GetServerSidePropsContext {
	params: { userId: string };
}

const WishlistPage: NextPage = ({
	serializedLocations,
	userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const locations = serializedLocations as Location[];

	const { data: session, status } = useSession();

	const title = `${userId}'s Wishlist`;
	const wishlistBelongsToLoggedInUser = status === "authenticated" && userId === session.user.fdlst_private_userId;
	const wishlistIsEmpty = !locations || locations.length === 0;

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main>
				<h1>{wishlistBelongsToLoggedInUser ? "Your" : `${userId}'s`} Wishlist</h1>
				{wishlistIsEmpty ? <p>Oops! There's nothing here!</p> : <LocationsList locations={locations} />}
			</main>
		</>
	);
};

const getServerSideProps: GetServerSideProps = async context => {
	const userId = (context as WishlistDetailsContext).params.userId;

	await dbConnect();
	const locations = await onWishlist(userId).catch(error => {
		console.error(error);
		return [];
	});
	// ↓ widely regarded as best practice. serializes an object. ↓
	const serializedLocations = JSON.parse(JSON.stringify(locations));

	return { props: { serializedLocations, userId } };
};

export default WishlistPage;
export { getServerSideProps };
