import { createTheme, alpha } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#bc9049',
        },
        secondary: {
            main: '#bc9049',
        },
        buttonColor: {
            main: '#ffffff'
        },
        favIcon: {
            main: '#d84e4b'
        }
    },
    spacing: 10,
    typography: {
        allVariants: {
            fontFamily: 'Dosis',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: "#bc9049",
                    color: "white",
                    border: "1px solid #bc9049",
                    '&:hover': {
                        background: "#fff",
                        color: "#bc9049",
                    }
                },
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: ({
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": {
                            borderColor: "#bc9049",
                        },
                    },
                    "& .MuiFilledInput-root": {
                        backgroundColor: 'white',
                    },
                    borderRadius: '5px'
                }),
            },
        },
        MuiSelect: {
          styleOverrides: {
              root: ({
                  '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: "#bc9049"
                  },
                  outlineColor: "#bc9049",
              })
          }
        },
        MuiRating: {
            styleOverrides: {
                icon: {
                    color: 'white',
                },
                iconFilled: {
                    color: "#bc9048"
                },
                iconHover: {
                    color: "#bc9048"
                },
                // root: ({
                //     "& .MuiRating-iconFilled": {
                //         color: "#bc9048"
                //     },
                //     "& .MuiRating-iconHover": {
                //         color: "#bc9048"
                //     }
                // })
            }
        },
    }
});

export default defaultTheme;
