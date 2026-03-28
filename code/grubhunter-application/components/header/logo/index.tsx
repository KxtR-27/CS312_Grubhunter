import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import styles from "./index.module.css"

// image from https://www.shapes.gallery/

const Logo = () => (<Link href={"/"}><Image src={logo} alt="Logo" className={styles.root} /></Link>)

export default Logo;