import Head from 'next/head';
import styles from '../styles/Home.module.css';
import FilmPoster from "../components/FilmPoster";
import { useState, useEffect } from "react";

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
		console.log(err)
	}
};

export default function Home({ films }) {
	const [filmList, setFilmList] = useState([])
	const [favourites, setFavourites] = useState([]);

	useEffect(() => {
		setFilmList(films.result)
	}, [getStaticProps]);

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

		setFavourites(favouritesList)
		
		// re-orders homepage film list based on latest favourite
		let newFilmList = [];
		newFilmList.push(favouriteFilmSelection);

		filmList.forEach(film => {
			if (film.properties.episode_id !== favouriteFilmSelection.properties.episode_id)
			newFilmList.push(film)
		});

		setFilmList(newFilmList);
	};

	// function to remove favourites on selection. passed down to FilmPoster component as props
	const handleRemoveFavourites = (favourite) => {
		// determines favourite film selection
		let favouriteFilmSelection = filmList.find(film => {
			if (film.properties.episode_id === favourite)
			return film
		});

		// removes favourite film selection from favourites array
		let favouritesList = []
		favourites.forEach(film => {
			if (film.properties.episode_id !== favourite) {
				favouritesList.push(film)
			}
		});
		setFavourites(favouritesList)
		
		// re-orders homepage film list based on latest removed favourite
		let newFilmList = [];
		filmList.forEach(film => {
			if (film.properties.episode_id !== favouriteFilmSelection.properties.episode_id)
			newFilmList.push(film)
		});
		newFilmList.push(favouriteFilmSelection);

		setFilmList(newFilmList);
	};

	return (
		<div className={styles.container}>
		<Head>
			<title>Star Wars Flix</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className="film-list" >
			{filmList.map((film) => (
				<FilmPoster 
					key={ film.properties.episode_id } 
					id={ film.properties.episode_id } 
					title={ film.properties.title } 
					release={ film.properties.release_date } 
					handleAddFavourites={ handleAddFavourites }
					handleRemoveFavourites={ handleRemoveFavourites }
					favourite={favourites.includes(film) ? true : false}
				/>
			))}
		</div>
		</div>
	)
};
