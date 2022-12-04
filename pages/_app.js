import Layout from '../components/Layout';
import '../styles/global.css';
import { useState, useEffect } from "react";
import FavouritesContext from "../context/FavouritesContext";
import FilmsContext from '../context/FilmsContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from "next/router";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

// fetching API data
export const getStaticProps = async () => {
	try {
		let response = await fetch("https://www.swapi.tech/api/films/");
		let data = await response.json();
		return {
			props: {
				films: data
			}
		};
	} catch (err) {
		console.log(err);
	}
};

function MyApp({ Component, pageProps, films }) {
	const [filmList, setFilmList] = useState([]);
	const [favourites, setFavourites] = useState([]);
	// monitors url changes to re-ender components
	const router = useRouter();
	const pathname = router.pathname;

	// grabs films from API call and sets film list on initial render
	useEffect(() => {
		if (localStorage.getItem("filmsList")) {
			let storedFilmsList = localStorage.getItem("filmsList");
			setFilmList(JSON.parse(storedFilmsList));
		} else {
			setFilmList(films.result);
		};
	}, [pathname]);

	useEffect(() => {
		if (localStorage.getItem("favouritesList") === null) {
			setFavourites([]);
		} else {
			let storedFavouritesList = localStorage.getItem("favouritesList");
			setFavourites(JSON.parse(storedFavouritesList))
		}
	}, [pathname]);


	return (
		<FilmsContext.Provider value={{ filmList, setFilmList }}>
			<FavouritesContext.Provider value={{ favourites, setFavourites}}>
				<Layout>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</Layout>
			</FavouritesContext.Provider>
		</FilmsContext.Provider>
	)
}

export default MyApp
