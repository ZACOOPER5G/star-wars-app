import Film from "../../components/Film";
import FilmsContext from "../../context/FilmsContext";
import FavouritesContext from "../../context/FavouritesContext";
import { useContext } from "react";

export const getStaticPaths = async () => {
    let res = await fetch("https://www.swapi.tech/api/films/");
    let data = await res.json();

    let paths = data.result.map((film) => {
        return {
            params: { film: film.uid.toString() }
        };
    });

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = async ( context ) => {
    const id = context.params.film;
    const response = await fetch(`https://www.swapi.tech/api/films/${id}`);
    const data = await response.json();

    return {
        props: { film: data }
    };
};

const Films = ({ film }) => {
    const filmsContext = useContext(FilmsContext);
	const { filmList, setFilmList } = filmsContext;
    const favouritesContext = useContext(FavouritesContext);
    const { favourites, setFavourites } = favouritesContext;

    const films = film.result;

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
        <Film
            key={ films.properties.episode_id } 
            id={ films.properties.episode_id }
            urlID = { films.uid }
            title={ films.properties.title } 
            release={ films.properties.release_date }
            handleAddFavourites={ handleAddFavourites }
			handleRemoveFavourites={ handleRemoveFavourites }
            favourite={JSON.stringify(favourites).includes(films._id.toString()) ? true : false }
        />
    )
}

export default Films