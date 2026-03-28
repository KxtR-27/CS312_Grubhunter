import { JSX } from "react";
import Header from "../header";

interface LayoutProps {
	children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="layout">
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default Layout;
