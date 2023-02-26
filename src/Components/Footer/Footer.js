import React from 'react';
import styles from './Footer.module.scss';
import logo from '../../images/circleLogo.svg'
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <Grid container justifyContent='space-between' alignItems='center'  className={styles.footer}>
            <Grid>
                <Grid>
                    <Typography fontSize='24px' fontWeight='bold'>
                        Email: office@santaherba.pl
                    </Typography>
                </Grid>

                <Grid>
                    <Typography fontSize='24px' fontWeight='bold'>
                        Phone: +48 536 245 860
                    </Typography>
                </Grid>
            </Grid>

            <Grid>
                <img className={styles.footer__image} src={logo} alt="images"/>
            </Grid>

            <Grid>
                <Typography variant='h3'>
                    privacy policy....
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;