import Head from 'next/head';
import FilmPoster from "../components/FilmPoster";
import { useContext } from "react";
import FavouritesContext from "../context/FavouritesContext";
import FilmsContext from '../context/FilmsContext';

export default function Home() {
	const filmsContext = useContext(FilmsContext);
	const { filmList, setFilmList, search } = filmsContext;
	const favouritesContext = useContext(FavouritesContext);
	const { favourites, setFavourites } = favouritesContext;

	// function to set favourites on selection. passed down to FilmPoster component as props
	const handleAddFavourites = (favourite) => {
		// determines favourite film selection
		let favouriteFilmSelection = filmList.find(film => {
			if (film.properties.episode_id === favourite)
			return film
		});

		// pushes favourite film selection to favourites array
		let favouritesList = [];
		favouritesList.push(favouriteFilmSelection);
		favourites.forEach(film => {
			favouritesList.push(film);
		});
		// adds favourite to local storage
		localStorage.setItem("favouritesList", JSON.stringify(favouritesList));
		let storedFavouritesList = localStorage.getItem("favouritesList");
		setFavourites(JSON.parse(storedFavouritesList));
		
		// re-orders homepage film list based on latest favourite and sets to localStorage
		let newFilmList = [];
		newFilmList.push(favouriteFilmSelection);

		filmList.forEach(film => {
			if (film.properties.episode_id !== favouriteFilmSelection.properties.episode_id)
			newFilmList.push(film)
		});

		// adds ordered list to localStorage
		localStorage.setItem("filmsList", JSON.stringify(newFilmList));
		let storedFilmsList = localStorage.getItem("filmsList")
		setFilmList(JSON.parse(storedFilmsList));
	};

	// function to remove favourites on selection. passed down to FilmPoster component as props
	const handleRemoveFavourites = (favourite) => {
		// determines favourite film selection
		let favouriteFilmSelection = filmList.find(film => {
			if (film.properties.episode_id === favourite)
			return film
		});

		// removes favourite film selection from favourites array
		let newFavouritesList = []
		favourites.forEach(film => {
			if (film.properties.episode_id !== favourite) {
				newFavouritesList.push(film)
			}
		});
		// removes favourite from local storage
		localStorage.setItem("favouritesList", JSON.stringify(newFavouritesList));
		let storedFavouritesList = localStorage.getItem("favouritesList");
		setFavourites(JSON.parse(storedFavouritesList));
		
		// re-orders homepage film list based on latest removed favourite
		let newFilmList = [];
		filmList.forEach(film => {
			if (film.properties.episode_id !== favouriteFilmSelection.properties.episode_id)
			newFilmList.push(film)
		});
		newFilmList.push(favouriteFilmSelection);

		// adds re-ordered list to localStorage
		localStorage.setItem("filmsList", JSON.stringify(newFilmList));
		let storedFilmsList = localStorage.getItem("filmsList");
		setFilmList(JSON.parse(storedFilmsList));
	};

	return (
		<div>
			<Head>
				<title>Star Wars Flix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="film-list" >
				{filmList && filmList.filter(film => {
					if (search === "") {
						return film
					} else if (film.properties.title.toString().toLowerCase().includes(search.toLowerCase())) {
						return film
					}
				}).map((film) => (
					<FilmPoster
						key={ film.properties.episode_id } 
						id={ film.properties.episode_id } 
						urlID = { film.uid }
						title={ film.properties.title } 
						release={ film.properties.release_date } 
						handleAddFavourites={ handleAddFavourites }
						handleRemoveFavourites={ handleRemoveFavourites }
						favourite={JSON.stringify(favourites).includes(film._id.toString()) ? true : false }
					/>
				))}
			</div>
		</div>
	)
};