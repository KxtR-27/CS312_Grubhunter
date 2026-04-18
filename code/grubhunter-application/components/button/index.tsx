import { JSX } from "react";
import styles from "./index.module.css";

interface ButtonProps {
	disabled?: boolean;
	children: JSX.Element[];
	variant?: "blue" | "outline";
	clickHandler?: (event?: unknown) => {};
}

const Button = ({ 
    disabled = false,
    children,
    variant,
    clickHandler 
}: ButtonProps) => {
	return (
		<div
			className={[variant, disabled ? "disabled" : undefined].join(" ")}
			style={styles}
			onClick={disabled ? undefined : clickHandler}
		>
			{...children}
		</div>
	);
};

export default Button;
