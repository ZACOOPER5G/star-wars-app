import { CardContent, Typography, CardActions, Button, Card } from "@mui/material";

const FilmPoster = ({ title, release }) => {
    return (
        <div>
            <Card variant="outlined" >
                <CardContent>
                    <Typography variant="h5" component="div">
                        { title }
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        { release }
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
};

export default FilmPoster