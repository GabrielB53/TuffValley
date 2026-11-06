
import React, { useContext, useMemo } from 'react';

import {
    ThemeProvider as MuiProvider,
    createTheme
} from '@mui/material/styles';

import { ThemeContext } from './ThemeContext';

const MuiThemeProvider = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    const muiTheme = useMemo(() => {
        const isDark = theme === 'Escuro';

        return createTheme({
            palette: {
                mode: isDark ? 'dark' : 'light',

                primary: {
                    main: isDark ? '#7A8660' : '#50552C',
                    dark: isDark ? '#929F75' : '#3D4220',
                    contrastText: '#FFFFFF'
                },

                secondary: {
                    main: '#E79321',
                    contrastText: '#242719'
                },

                background: {
                    default: isDark ? '#242719' : '#F4F1E8',
                    paper: isDark ? '#343923' : '#FFFFFF'
                },

                text: {
                    primary: isDark ? '#F4F1E8' : '#242719',
                    secondary: isDark ? '#D5D9C8' : '#62664F'
                },

                error: {
                    main: isDark ? '#C45B45' : '#782117'
                }
            },

            typography: {
                fontFamily: 'Inter, sans-serif',

                button: {
                    textTransform: 'none',
                    fontWeight: 600
                }
            },

            shape: {
                borderRadius: 8
            },

            components: {
                // Campos de texto
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            color: 'inherit'
                        },

                        input: {
                            color: 'inherit',
                            WebkitTextFillColor: 'currentColor'
                        }
                    }
                },

                // Campos com borda
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            color: 'inherit'
                        }
                    }
                },

                // Labels dos formulários
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            color: 'inherit'
                        }
                    }
                }
            }
        });
    }, [theme]);

    return (
        <MuiProvider theme={muiTheme}>
            {children}
        </MuiProvider>
    );
};

export default MuiThemeProvider;
