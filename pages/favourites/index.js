import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FilmPoster from "../../components/FilmPoster";
import FilmsContext from "../../context/FilmsContext";

const Favourites = () => {
	const [filmList, setFilmList] = useState([]);
	const [favourites, setFavourites] = useState([]);
    // monitors url changes to re-ender components
    const router = useRouter();
	const pathname = router.pathname;
    // bringing in search state
    const filmsContext = useContext(FilmsContext);
    const { search } = filmsContext;

    useEffect(() => {
		if (localStorage.getItem("filmsList")) {
			let storedFilmsList = localStorage.getItem("filmsList");
			setFilmList(JSON.parse(storedFilmsList));
		}
	}, [pathname]);

	useEffect(() => {
		if (localStorage.getItem("favouritesList")) {
			let storedFavouritesList = localStorage.getItem("favouritesList");
			setFavourites(JSON.parse(storedFavouritesList))
		}
	}, [pathname]);

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
        <div className={ favourites.length > 0 ? "film-list" : null } >
            {favourites.length > 0 ? favourites.filter(film => {
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
			)) : (<h1>You haven't added any favourites yet. Add some from the <Link href="/" >home page.</Link></h1>)}
        </div>
    )
};

export default Favourites