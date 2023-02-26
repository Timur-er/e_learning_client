import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardActions, CardContent, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { COURSE_PAGE } from "../../routes/consts";
import styles from './CourseCard.module.scss';
import * as Styled from './CourseCard_style.js';

const CourseCard = ({course_id, title, description, rating, enrollments, price, image, is_paid, short, finished}) => {
    const [favourite, setFavourite] = useState(false);
    const imageLink = process.env.REACT_APP_API_URL + image;

    const handleFavourites = (e) => {
        setFavourite(prevState => !prevState);
    }

    return (
        <Styled.CourseCard>
            <Styled.Media
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
        </Styled.CourseCard>
    );
};

export default CourseCard;