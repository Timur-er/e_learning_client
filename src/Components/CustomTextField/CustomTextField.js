import React, {useEffect} from 'react';
import {Checkbox, InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { useField } from 'formik';

const CustomTextField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (props.type === 'password') {
        return (
            <TextField
                color="secondary"
                fullWidth
                variant="outlined"
                {...field}
                {...props}
                type={showPassword ? 'string' : 'password'}
                label={
                    (meta.error && meta.touched && String(meta.error)) || placeholder
                }
                error={meta.touched && Boolean(meta.error)}
                InputLabelProps={{ required: true }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        );
    }

    if (props.type === 'date') {
        return (
            <TextField
                color="secondary"
                fullWidth
                variant="outlined"
                {...field}
                {...props}
                InputLabelProps={{ shrink: true, required: true }}
                label={(meta.error && meta.touched && String(meta.error)) || placeholder}
                error={meta.touched && Boolean(meta.error)}
            />
        );
    }

    if (props.type === 'checkbox') {
        return (
                <Checkbox {...field} {...props} color="success"/>
        );
    }

    return (
        <TextField
            color="secondary"
            fullWidth
            variant="outlined"
            {...field}
            {...props}
            InputLabelProps={{ required: true }}
            label={(meta.error && meta.touched && String(meta.error)) || placeholder}
            error={meta.touched && Boolean(meta.error)}
        />
    );
};

export default CustomTextField;