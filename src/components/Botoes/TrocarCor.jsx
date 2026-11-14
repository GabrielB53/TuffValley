
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

import { ThemeContext } from '../../contexts/ThemeContext';
import './Theme.css';

function BotaoTroca() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const isDark = theme === 'Escuro';

    return (
        <Button
            onClick={toggleTheme}
            variant="outlined"
            startIcon={
                isDark
                    ? <WbSunnyRoundedIcon />
                    : <DarkModeRoundedIcon />
            }
            aria-label={`Ativar tema ${isDark ? 'claro' : 'escuro'}`}
            className="tuff-theme-toggle"
        >
            {isDark ? 'Tema claro' : 'Tema escuro'}
        </Button>
    );
}

export default BotaoTroca;
