import { signIn, signOut, useSession } from "next-auth/react";
import React, { JSX } from "react";

import styles from "./index.module.css";
import Button from "../button";
import Link from "next/link";

const AuthElement = (): JSX.Element => {
	const { data: session, status } = useSession();
	const authenticated = status === "authenticated";

	const greetingSpan = <span className="name">Hello, {session?.user.name}!</span>;

	const wishlistButton = (
		<Button children={<Link href={`/list/${session?.user.fdlst_private_userId}`}>My Wishlist</Link>} variant={"outline"} />
	);

	const signInOutButton = (
		<Button
			children={<span>{authenticated ? "Sign out" : "Sign in"}</span>}
			variant={"blue"}
			clickHandler={() => (authenticated ? signOut() : signIn())}
		/>
	);

	return (
		<nav style={styles}>
			{authenticated ? greetingSpan : undefined}
			{authenticated ? wishlistButton : undefined}
			{signInOutButton}
		</nav>
	);
};

export default AuthElement;
