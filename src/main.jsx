
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './components/AppRoutes.jsx';

import { UserProvider } from './contexts/UserContext';
import { ThemeProvider as AppThemeProvider } from '../src/contexts/ThemeContext.jsx';

import MuiThemeProvider from '../src/contexts/MuiThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppThemeProvider>
                <MuiThemeProvider>
                    <UserProvider>
                        <AppRoutes />
                    </UserProvider>
                </MuiThemeProvider>
            </AppThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
