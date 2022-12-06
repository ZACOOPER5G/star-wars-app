import { CardContent, Typography, CardActions, Button, Card } from "@mui/material";
import styles from "../styles/Films.module.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Link from "next/link";

const FilmPoster = ({ title, release, handleAddFavourites, handleRemoveFavourites, id, favourite, urlID }) => {

    return (
        <div className={styles.film} >
            <Card variant="outlined" >
                <CardContent>
                    { favourite ? (
                        <button className={styles.favourite} onClick={() => handleRemoveFavourites(id)}><StarIcon /></button> 
                    ) : (
                        <button className={styles.favourite} onClick={() => handleAddFavourites(id)}><StarBorderIcon /></button>
                    ) }
                    <Typography variant="h5" component="div" className={styles.title}>
                        <Link href={`/films/${urlID}`}>{ title }</Link>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Released: { release }
                    </Typography>
                    <Typography variant="body2">

                    </Typography>
                    </CardContent>
                    <CardActions>
                    <span className={styles.buttons}>
                        <Link href={`/films/${urlID}`}><Button size="small" color="info">See more</Button></Link>
                        {!favourite ? <Button size="small" onClick={() => handleAddFavourites(id)} color="primary" >Add to favourites</Button> :  <Button size="small" onClick={() => handleRemoveFavourites(id)} color="error" >Remove from favourites</Button>}
                    </span>
                </CardActions>
            </Card>
        </div>
    )
};

export default FilmPoster