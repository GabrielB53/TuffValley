
import React, { useContext } from 'react';

import {
    Container,
    Nav,
    Navbar
} from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

import ThemeToggleButton from '../Botoes/TrocarCor';

import Logo from '../../assets/images/Logo.png';
import perfil from '../../assets/images/Logozinha.png';

import { ThemeContext } from '../../contexts/ThemeContext';
import { UserContext } from '../../contexts/UserContext';

import './Navegar.css';

function Navegar() {

    const { theme } = useContext(ThemeContext);
    const { currentUser } = useContext(UserContext);

    const navigate = useNavigate();

    const isDark = theme === 'Escuro';

    const editarPerfil = () => {
        if (currentUser?.id) {
            navigate(`/usuarioperfil/${currentUser.id}`);
        }
    };

    return (
        <Navbar
            expand="lg"
            className="tuff-navbar"
            data-bs-theme={isDark ? 'dark' : 'light'}
        >
            <Container fluid="lg" className="tuff-navbar-container">

                {/* IDENTIDADE VISUAL */}

                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="tuff-brand"
                    aria-label="TuffValley - Página inicial"
                >
                    <img
                        src={Logo}
                        alt=""
                        className="tuff-logo"
                    />

                    <span className="tuff-brand-name">
                        TuffValley
                    </span>
                </Navbar.Brand>

                {/* CONTROLE DO MENU MOBILE */}

                <Navbar.Toggle
                    aria-controls="tuff-navbar-content"
                    aria-label="Abrir ou fechar menu"
                />

                {/* CONTEÚDO DA NAVBAR */}

                <Navbar.Collapse id="tuff-navbar-content">

                    <Nav className="ms-auto align-items-lg-center tuff-nav-actions">

                        {/* PERFIL DO USUÁRIO */}

                        {currentUser && (
                            <button
                                type="button"
                                className="tuff-user-profile"
                                onClick={editarPerfil}
                                aria-label={`Acessar perfil de ${currentUser.nome}`}
                            >
                                <img
                                    src={currentUser.foto || perfil}
                                    alt=""
                                    className="tuff-user-avatar"
                                />

                                <span className="tuff-user-info">

                                    <span className="tuff-user-name">
                                        {currentUser.nome}
                                    </span>

                                    <span className="tuff-user-role">
                                        {currentUser.nivelAcesso || 'USER'}
                                    </span>

                                </span>

                                <span
                                    className="tuff-user-indicator"
                                    aria-hidden="true"
                                />
                            </button>
                        )}

                        {/* DIVISOR E TROCA DE TEMA */}

                        <div className="tuff-theme-button">
                            <ThemeToggleButton />
                        </div>

                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default Navegar;
