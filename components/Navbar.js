import Link from "next/link";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import styles from "../styles/Nav.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from "react";

const Navbar = ({ setSearch }) => {
	const [open, setOpen] = useState(false);
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
		setOpen(!open);
	};

  	return (
		<nav>
			<div className={styles.logo} >
				<h1 className={styles.logo}>Star Wars Flix</h1>
			</div>
			<div className={styles.navLinks} ref={navRef}>
				<Paper
					onSubmit={(e) => {
						e.preventDefault()
					}}
					component="form"
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 220, height: 40 }}
					>
					<InputBase
						sx={{ ml: 1, flex: 1, fontSize: "14px" }}
						placeholder="Search Films"
						onChange={(e) => {
							setSearch(e.target.value);
						}}

					/>
					</Paper>
				<Link href="/" className={styles.link}>Home</Link>
				<Link href="/favourites" className={styles.link}>Favourites</Link>
				</div>
				<button className={`${styles.hamburger} nav-btn nav-close-btn`} onClick={showNavbar} >{!open ? <MenuIcon></MenuIcon> : <CloseIcon></CloseIcon>}</button>
		</nav>
	)
}

export default Navbar