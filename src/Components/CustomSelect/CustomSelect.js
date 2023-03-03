import React from 'react';
import {FormControl, InputLabel, OutlinedInput, Select, useTheme} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useField} from "formik";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const CustomSelect = ({labels, options}) => {
    const [field, meta] = useField(options);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label">Course labels</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                {...field}
                {...options}
                input={<OutlinedInput label="Course labels" />}
                MenuProps={MenuProps}
            >
                {labels.map((label) => (
                    <MenuItem
                        key={label.id}
                        value={label.id}
                        style={getStyles(label.label, personName, theme)}
                    >
                        {label.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;