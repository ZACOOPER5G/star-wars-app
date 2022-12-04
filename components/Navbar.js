import Link from "next/link";
import styles from "../styles/Nav.module.css";

const Navbar = () => {
  	return (
		<nav>
			<div className={styles.logo} >
				<h1 className={styles.logo}>Star Wars Flix</h1>
			</div>
			<Link href="/" className={styles.link}>Home</Link>
			<Link href="/favourites" className={styles.link}>Favourites</Link>
		</nav>
	)
}

export default Navbar