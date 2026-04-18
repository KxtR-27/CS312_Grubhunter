import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "@/grubhunter-application/components/layout";

// @ts-expect-error - for some reason the fixes for CSS types missing aren't working
import "@/styles/globals.css";
// @ts-expect-error - I tried declaring a module, I checked the TypeScript version
import "@/styles/layout.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Layout children={<Component {...pageProps} />} />
		</SessionProvider>
	);
}
