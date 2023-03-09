import React from 'react';
import {Chip} from "@mui/material";
import Box from "@mui/material/Box";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PercentIcon from '@mui/icons-material/Percent';

const Labels = React.memo(( {labels} ) => {

    const renderLabels = labels.map(label => {
        if (label.label === 'top') {
            return <Chip variant="outlined" color="primary" label={label.label} icon={<WhatshotIcon/>}/>
        } else if (label.label === 'sale') {
            return <Chip variant="outlined" color="secondary" label={label.label} icon={<PercentIcon/>}/>
        } else {
            return <Chip variant="outlined" label={label.label}/>
        }
    })

    return (
        <Box style={{display: 'flex', gap: '10px'}}>
            {renderLabels}
        </Box>
    );
}, (prevProps, nextProps) => {
    return prevProps.deepProp === nextProps.deepProp;
});

export default Labels;