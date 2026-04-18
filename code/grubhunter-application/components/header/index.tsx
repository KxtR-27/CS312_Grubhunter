import AuthElement from "../auth-element";
import Logo from "./logo";

const Header = () => {
	return (
		<header>
			<div className="layout-grid">
				<Logo />
                <AuthElement />
			</div>
		</header>
	);
};

export default Header;
