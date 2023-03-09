import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {CardActions, CardContent, Grid, Rating} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { COURSE_PAGE } from "../../routes/consts";
import styles from './CourseCard.module.scss';
import * as Styled from './CourseCard_style.js';
import {Label} from "@mui/icons-material";
import Labels from "../Labels/Labels";

const CourseCard = ({course_id, title, description, rating, enrollments, price, image, is_paid, short, finished, labels, previous_price}) => {
    const [favourite, setFavourite] = useState(false);
    // const imageLink = process.env.REACT_APP_API_URL + image;

    const handleFavourites = (e) => {
        setFavourite(prevState => !prevState);
    }

    return (
        <Styled.CourseCard>
            <Styled.Media
                image={image}
                title={title}
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

                    <Grid container alignItems='center' justifyContent='space-between'>
                        <Typography variant="body2" style={{marginTop: 16}}>

                            Price: {previous_price && <s style={{color: 'grey'}}>{previous_price}$</s>} {price}$
                        </Typography>

                        <Labels labels={labels}/>
                    </Grid>

                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                    {finished ? (
                        <Button onClick={(e) => console.log('doenload certificate')}>
                            Download certificate
                        </Button>
                    ) : <Button
                        variant='outlined'
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