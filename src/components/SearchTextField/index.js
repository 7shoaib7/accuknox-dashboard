import React from 'react';
//mui-component
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField = ({
    placeholder = "Search...",
    value,
    onChange,
    height,
    width,
    ...otherProps
}) => {
    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    height: height ? height : "2rem",
                    width: width ? width : "10rem",
                    '&.Mui-focused fieldset': {
                        borderColor: '#000025',
                    },
                },
            }}
            {...otherProps}
        />
    );
};

export default SearchTextField;