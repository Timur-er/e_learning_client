import React from 'react';
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CertificateCard = ({image, course_name, short_description}) => {
    const downloadImage = (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = image;
        link.download = `${course_name} - certificate`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Card sx={{maxWidth: 400}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="100%"
                src={image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {course_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {short_description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={(e) => downloadImage(e)}>Download certificate</Button>
            </CardActions>
        </Card>
    );
};

export default CertificateCard;