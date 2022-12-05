import { CardContent, Typography, CardActions, Button, Card } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import styles from "../styles/Films.module.css";
import { useEffect, useState } from "react";
import Character from "./Character";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Film = ({ title, release, handleAddFavourites, handleRemoveFavourites, id, favourite, director, producer, characters }) => {
    const [filmCharacters, setFilmCharacters] = useState([]);
    const [loading, setLoading] = useState([false]);

    // fetches all character data
    const fetchCharacterData = async () => {
        try {
            setLoading(true)
            const response = await Promise.all(
            characters.map(url => fetch(url).then(res => res.json()))
            )
            setFilmCharacters(response);
            setLoading(false)
        } catch (error) {
            console.log("Error", error)
        }
    }; 

    useEffect(() => {
        fetchCharacterData();
    }, []);

    return (
        <Card variant="outlined" >
            <CardContent>
                { favourite ? (
                    <button className={styles.favouriteFilmPage} onClick={() => handleRemoveFavourites(id)}><StarIcon /></button> 
                ) : (
                    <button className={styles.favouriteFilmPage} onClick={() => handleAddFavourites(id)}><StarBorderIcon /></button>
                ) }
                <Typography variant="h5" component="div">
                    { title }
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Released: { release }
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Director: { director }
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Producer: { producer }
                </Typography>
                <Typography variant="body2">
                    Characters: <div className={styles.characters} >{ 
                        !loading ? (filmCharacters.map((character) => (
                            <Character 
                                key={ character.result.uid }
                                name={ character.result.properties.name }
                                birthYear={ character.result.properties.birth_year }
                                hairColor={ character.result.properties.hair_color }
                                eyeColor={ character.result.properties.eye_color }
                                gender={ character.result.properties.gender }
                                homeworld={ character.result.properties.homeworld }
                            />
                        ))) : (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        ) 
                    }</div>
                </Typography>
                </CardContent>
                <CardActions>
                <span className={styles.buttons}>
                    {!favourite ? <Button size="small" onClick={() => handleAddFavourites(id)} color="primary" >Add to favourites</Button> :  <Button size="small" onClick={() => handleRemoveFavourites(id)} color="error" >Remove from favourites</Button>}
                </span>
            </CardActions>
        </Card>
    )
}

export default Film

