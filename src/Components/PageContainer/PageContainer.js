import React from 'react';
import {Grid} from "@mui/material";

const PageContainer = ({ children }) => {
    return (
        <Grid
            container
            minHeight='100vh'
            style={{backgroundColor: '#f5f5f5'}}
            flexDirection='column'
            gap='20px'
            padding='80px 40px 150px 40px'
        >
            {children}
        </Grid>
    );
};

export default PageContainer;