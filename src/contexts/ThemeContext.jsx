
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('tema') || 'Claro';
    });

    useEffect(() => {
        const isDark = theme === 'Escuro';

        // Atualiza o tema global da aplicação
        document.documentElement.classList.toggle('dark-theme', isDark);

        // Atualiza o tema do Bootstrap
        document.documentElement.setAttribute(
            'data-bs-theme',
            isDark ? 'dark' : 'light'
        );

        // Persiste a preferência
        localStorage.setItem('tema', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (
            prev === 'Claro' ? 'Escuro' : 'Claro'
        ));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
