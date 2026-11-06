
import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import ThemeToggleButton from '../Botoes/TrocarCor';
import Logo from '../../assets/images/logo.png';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Navegar.css';

function BasicExample() {
    const { theme } = useContext(ThemeContext);

    const isDark = theme === 'Escuro';

    return (
        <Navbar
            expand="lg"
            className="tuff-navbar"
            data-bs-theme={isDark ? 'dark' : 'light'}
        >
            <Container fluid="lg">

                {/* IDENTIDADE VISUAL */}
                <Navbar.Brand href="#home" className="tuff-brand">
                    <img
                        src={Logo}
                        alt="Logo TuffValley"
                        className="tuff-logo"
                    />

                    <span className="tuff-brand-name">
                        TuffValley
                    </span>
                </Navbar.Brand>

                {/* MENU MOBILE */}
                <Navbar.Toggle aria-controls="tuff-navbar-content" />

                <Navbar.Collapse id="tuff-navbar-content">
                    <Nav className="ms-auto align-items-lg-center">
                        <div className="tuff-theme-button">
                            <ThemeToggleButton />
                        </div>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default BasicExample;
