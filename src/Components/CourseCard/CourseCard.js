import React, {useState} from 'react';
import {Card, CardActions, CardContent, CardMedia, Rating} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {COURSE_PAGE} from "../../routes/consts";
import styles from './CourseCard.module.scss'
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CourseCard = ({course_id, title, description, rating, enrollments, price, image, is_paid, short, finished}) => {
    const [favourite, setFavourite] = useState(false);
    const imageLink = process.env.REACT_APP_API_URL + image;

    const handleFavourites = (e) => {
        setFavourite(prevState => !prevState);
    }

    return (
        <Card sx={{maxWidth: 600, display: 'flex'}}>
            <CardMedia
                sx={{minWidth: '25%'}}
                image={imageLink}
                title="green iguana"
            />
            <Box className={styles.course}>
                <CardContent style={{paddingBottom: 0}}>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    {!short && <Typography variant="body2" color="text.secondary" className={styles.description}>
                        {description}
                    </Typography>
                    }

                    <Typography variant="body2" style={{marginTop: 16}}>
                        Price: {price}$
                    </Typography>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                    {finished ? (
                        <Button onClick={(e) => console.log('doenload certificate')}>
                            Download certificate
                        </Button>
                    ) : <Button
                        component={Link}
                        to={`${COURSE_PAGE}/${course_id}`}
                        size="small">
                        {is_paid ? 'start course' : 'learn more'}
                    </Button>}

                    <Rating value={5} disabled precision={0.5}/>

                    <IconButton onClick={e => handleFavourites(e)}>
                        {favourite ? <FavoriteIcon color='favIcon'/> : <FavoriteBorderIcon color='secondary'/>}
                    </IconButton>
                </CardActions>
            </Box>
        </Card>
    );
};

export default CourseCard;