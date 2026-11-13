
import React from 'react';
import './App.css';

import Navbar from '../../components/Navbar/Navegacao';
import SectionContent from '../../components/Secoes/SectionContent';
import CustomCarousel from '../../components/Carousel/Carousel';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Stack
} from '@mui/material';

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import NaturePeopleRoundedIcon from '@mui/icons-material/NaturePeopleRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import YardRoundedIcon from '@mui/icons-material/YardRounded';
import ForestRoundedIcon from '@mui/icons-material/ForestRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';


const planos = [
    {
        nome: 'Broto',
        descricao: 'O primeiro passo para descobrir novas experiências.',
        preco: 'R$ 89,90',
        icon: <SpaRoundedIcon />
    },
    {
        nome: 'Cultivo',
        descricao: 'Mais possibilidades para sua jornada florescer.',
        preco: 'R$ 179,90',
        icon: <YardRoundedIcon />,
        destaque: true
    },
    {
        nome: 'Colheita',
        descricao: 'Uma experiência completa de possibilidades.',
        preco: 'R$ 329,90',
        icon: <ForestRoundedIcon />
    }
];


function App() {
    const navigate = useNavigate();
    const { currentUser } = useUser();

    const usuarioLogado = Boolean(currentUser);

    // Navegação
    const irParaLogin = () => navigate('/login');
    const irParaCadastro = () => navigate('/newuser');
    const irParaPlanos = () => navigate('/planos');

    return (
        <Box className="app-home" sx={{ minHeight: '100vh' }}>

            {/* NAVEGAÇÃO */}
            <Box component="nav" aria-label="Navegação principal">
                <Navbar />
            </Box>

            <main>

                {/* HERO */}
                <Box
                    component="section"
                    className="home-hero"
                    aria-labelledby="home-hero-title"
                >
                    <Container maxWidth="lg">

                        <Box className="home-hero-content">

                            {/* CONTEÚDO PRINCIPAL */}
                            <Box className="home-hero-text">

                                <span className="home-eyebrow">
                                    <SpaRoundedIcon />
                                    TUFFVALLEY · CULTIVE NOVAS EXPERIÊNCIAS
                                </span>

                                <Typography
                                    id="home-hero-title"
                                    variant="h1"
                                    component="h1"
                                    className="home-hero-title"
                                >
                                    Desconecte-se um pouco.
                                    <span>Reconecte-se com a vida.</span>
                                </Typography>

                                <Typography
                                    variant="body1"
                                    className="home-hero-description"
                                >
                                    Encontre um espaço para desacelerar,
                                    explorar sua criatividade, fortalecer
                                    conexões e descobrir o prazer de viver
                                    momentos longe das telas.
                                </Typography>

                                {/* AÇÕES PARA VISITANTES */}
                                {!usuarioLogado && (
                                    <Box className="home-visitor-actions">

                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={2}
                                            className="home-hero-actions"
                                            flexWrap="wrap"
                                        >
                                            <Button
                                                onClick={irParaLogin}
                                                variant="contained"
                                                startIcon={<LoginRoundedIcon />}
                                                className="home-primary-button"
                                            >
                                                Entrar na minha conta
                                            </Button>

                                            <Button
                                                onClick={irParaCadastro}
                                                variant="outlined"
                                                startIcon={<PersonAddAlt1RoundedIcon />}
                                                className="home-secondary-button"
                                            >
                                                Criar minha conta
                                            </Button>
                                        </Stack>

                                        <Button
                                            onClick={irParaPlanos}
                                            variant="text"
                                            endIcon={<ArrowForwardRoundedIcon />}
                                            className="home-plans-link"
                                        >
                                            Conhecer os planos
                                        </Button>

                                    </Box>
                                )}

                                {/* EXPERIÊNCIA PARA USUÁRIOS LOGADOS */}
                                {usuarioLogado && (
                                    <Box className="home-logged-content">

                                        <Box className="home-welcome">
                                            <SpaRoundedIcon />

                                            <Typography variant="body1">
                                                Que bom ter você de volta,
                                                <strong>
                                                    {' '}{currentUser?.nome || 'cultivador'}!
                                                </strong>
                                            </Typography>
                                        </Box>

                                        <Button
                                            onClick={irParaPlanos}
                                            variant="contained"
                                            endIcon={<ArrowForwardRoundedIcon />}
                                            className="home-primary-button home-logged-button"
                                        >
                                            Explorar os planos
                                        </Button>

                                    </Box>
                                )}

                                <div className="home-hero-note">
                                    <CheckCircleRoundedIcon />

                                    <span>
                                        Novas experiências começam com pequenos passos.
                                    </span>
                                </div>

                            </Box>

                            {/* ELEMENTO VISUAL */}
                            <Box
                                className="home-hero-visual"
                                aria-hidden="true"
                            >
                                <div className="home-visual-circle">

                                    <div className="home-visual-inner">
                                        <SpaRoundedIcon />
                                        <span>Floresça no seu ritmo</span>
                                    </div>

                                </div>

                                <div className="home-floating-card home-floating-top">
                                    <NaturePeopleRoundedIcon />
                                    <span>Conexões reais</span>
                                </div>

                                <div className="home-floating-card home-floating-bottom">
                                    <SelfImprovementRoundedIcon />
                                    <span>Mais bem-estar</span>
                                </div>

                                <span className="home-decoration decoration-one">
                                    ✿
                                </span>

                                <span className="home-decoration decoration-two">
                                    ✦
                                </span>

                                <span className="home-decoration decoration-three">
                                    ❋
                                </span>

                            </Box>

                        </Box>
                    </Container>
                </Box>


                {/* APRESENTAÇÃO INSTITUCIONAL */}
                <Box
                    component="section"
                    className="home-section"
                    aria-label="Conheça a TuffValley"
                >
                    <Container maxWidth="lg">
                        <SectionContent />
                    </Container>
                </Box>


                {/* EXPERIÊNCIAS */}
                <Box
                    component="section"
                    id="experiencias"
                    className="home-carousel-section"
                    aria-labelledby="home-carousel-title"
                >
                    <Container maxWidth="lg">

                        <div className="home-section-heading">

                            <span className="home-eyebrow">
                                <SpaRoundedIcon />
                                UM CONVITE PARA DESCOBRIR
                            </span>

                            <Typography
                                id="home-carousel-title"
                                variant="h2"
                                component="h2"
                            >
                                Cada espaço, uma nova experiência.
                            </Typography>

                            <Typography variant="body1">
                                Conheça os ambientes da TuffValley e descubra
                                possibilidades para sair da rotina, explorar
                                sua criatividade e aproveitar o presente.
                            </Typography>

                        </div>

                        <Paper
                            elevation={0}
                            className="home-carousel-paper"
                        >
                            <CustomCarousel />
                        </Paper>

                    </Container>
                </Box>


                {/* PLANOS */}
                <Box
                    component="section"
                    id="planos"
                    className="home-plans-section"
                    aria-labelledby="home-plans-title"
                >
                    <Container maxWidth="lg">

                        <div className="home-section-heading">

                            <span className="home-eyebrow">
                                <SpaRoundedIcon />
                                CRESÇA COM A TUFFVALLEY
                            </span>

                            <Typography
                                id="home-plans-title"
                                variant="h2"
                                component="h2"
                            >
                                Escolha como florescer.
                            </Typography>

                            <Typography variant="body1">
                                Cada jornada começa de um jeito. Conheça
                                nossas opções e encontre o plano que
                                acompanha sua vontade de descobrir.
                            </Typography>

                        </div>

                        <Box className="home-plans-grid">

                            {planos.map((plano) => (
                                <Paper
                                    key={plano.nome}
                                    elevation={0}
                                    className={`home-plan-card ${
                                        plano.destaque ? 'home-plan-featured' : ''
                                    }`}
                                >

                                    {plano.destaque && (
                                        <span className="home-plan-badge">
                                            Em destaque
                                        </span>
                                    )}

                                    <div className="home-plan-icon">
                                        {plano.icon}
                                    </div>

                                    <Typography
                                        variant="h3"
                                        component="h3"
                                    >
                                        {plano.nome}
                                    </Typography>

                                    <Typography variant="body2">
                                        {plano.descricao}
                                    </Typography>

                                    <div className="home-plan-price">
                                        <strong>{plano.preco}</strong>
                                        <span>/ mês</span>
                                    </div>

                                    <Button
                                        onClick={irParaPlanos}
                                        variant={plano.destaque ? 'contained' : 'outlined'}
                                        endIcon={<ArrowForwardRoundedIcon />}
                                        className="home-plan-button"
                                    >
                                        Ver detalhes
                                    </Button>

                                </Paper>
                            ))}

                        </Box>

                        <div className="home-plans-footer">
                            <Button
                                onClick={irParaPlanos}
                                variant="text"
                                endIcon={<ArrowForwardRoundedIcon />}
                            >
                                Conheça todos os benefícios dos planos
                            </Button>
                        </div>

                    </Container>
                </Box>


                {/* CHAMADA FINAL */}
                <Container
                    maxWidth="lg"
                    className="home-final-container"
                >
                    <Paper
                        elevation={0}
                        className="home-final-cta"
                    >

                        <div
                            className="home-cta-decoration"
                            aria-hidden="true"
                        >
                            ✿
                        </div>

                        <span className="home-eyebrow">
                            SUA PRÓXIMA EXPERIÊNCIA COMEÇA AQUI
                        </span>

                        <Typography
                            variant="h2"
                            component="h2"
                        >
                            O próximo momento especial pode começar aqui.
                        </Typography>

                        <Typography variant="body1">
                            Permita-se sair da rotina, descobrir novas
                            experiências e aproveitar o presente.
                        </Typography>

                        <Button
                            onClick={irParaPlanos}
                            variant="contained"
                            endIcon={<ArrowForwardRoundedIcon />}
                            className="home-cta-button"
                        >
                            Encontre seu plano
                        </Button>

                    </Paper>
                </Container>

            </main>


            {/* RODAPÉ */}
            <Box
                component="footer"
                className="home-footer"
            >
                <Container maxWidth="lg">

                    <div className="home-footer-brand">
                        <SpaRoundedIcon />
                        <strong>TUFFVALLEY</strong>
                    </div>

                    <Typography variant="body2">
                        Desconectar para reconectar.
                    </Typography>

                    <Typography variant="caption">
                        © {new Date().getFullYear()} TuffValley.
                        Todos os direitos reservados.
                    </Typography>

                </Container>
            </Box>

        </Box>
    );
}

export default App;
