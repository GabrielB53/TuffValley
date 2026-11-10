
import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import ThemeToggleButton from '../Botoes/TrocarCor';

import Logo from '../../assets/images/Logo.png';
import perfil from '../../assets/images/Logozinha.png';

import { ThemeContext } from '../../contexts/ThemeContext';
import { UserContext } from '../../contexts/UserContext';

import { useNavigate } from 'react-router-dom';

import './Navegar.css';

function BasicExample() {

    const { theme } = useContext(ThemeContext);
    const { currentUser } = useContext(UserContext);

    const navigate = useNavigate();

    const isDark = theme === 'Escuro';

    const editarPerfil = () => {
        if (currentUser) {
            navigate(`/usuarioperfil/${currentUser.id}`);
        }
    };

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

                    <Nav className="ms-auto align-items-lg-center tuff-nav-actions">

                        {/* USUÁRIO LOGADO */}
                        {currentUser && (
                            <div
                                className="tuff-user-profile"
                                onClick={editarPerfil}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') editarPerfil();
                                }}
                            >
                                <img
                                    src={currentUser.foto || perfil}
                                    alt="Foto do usuário"
                                    className="tuff-user-avatar"
                                />

                                <div className="tuff-user-info">
                                    <span className="tuff-user-name">
                                        {currentUser.nome}
                                    </span>

                                    <span className="tuff-user-role">
                                        {currentUser.nivelAcesso || 'USER'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* TROCA DE TEMA */}
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
