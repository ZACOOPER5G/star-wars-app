import Link from "next/link";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/Nav.module.css";

const Navbar = ({ setSearch }) => {
  	return (
		<nav>
			<div className={styles.logo} >
				<h1 className={styles.logo}>Star Wars Flix</h1>
			</div>
			<Paper
				component="form"
				sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 220, height: 40 }}
				>
				<InputBase
					sx={{ ml: 1, flex: 1, fontSize: "14px" }}
					placeholder="Search Films"
					inputProps={{ 'aria-label': 'search google maps' }}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
					<SearchIcon />
				</IconButton>
				</Paper>
			<Link href="/" className={styles.link}>Home</Link>
			<Link href="/favourites" className={styles.link}>Favourites</Link>
		</nav>
	)
}

export default Navbar