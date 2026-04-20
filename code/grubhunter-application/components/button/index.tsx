import { JSX } from "react";
import styles from "./index.module.css";

interface ButtonProps {
	disabled?: boolean;
	children: JSX.Element | JSX.Element[];
	variant?: "blue" | "outline";
	clickHandler?: (event?: unknown) => {};
}

const Button = ({ disabled = false, children, variant, clickHandler }: ButtonProps) => {
	const parseClasses = () => {
        const classes = [styles.root]

		if (variant === "blue") classes.push(styles.blue);
		else if (variant === "outline") classes.push(styles.outline);

		if (disabled) classes.push(styles.disabled);

		return classes;
	};

	return (
		<div className={parseClasses().join(" ")} onClick={disabled ? undefined : clickHandler}>
			{children}
		</div>
	);
};

export default Button;
