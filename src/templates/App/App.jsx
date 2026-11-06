
import React from 'react';
import './App.css';

import Navbar from '../../components/Navbar/Navegacao';
import SectionContent from '../../components/Secoes/SectionContent';
import CustomCarousel from '../../components/Carousel/Carousel';

import { useNavigate } from 'react-router-dom';

import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Stack
} from '@mui/material';

function App() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    };

    return (
        <Box className="opa" sx={{ minHeight: '100vh' }}>

            {/* NAVEGAÇÃO */}
            <Box component="nav">
                <Navbar />
            </Box>

            {/* CONTEÚDO PRINCIPAL */}
            <main>

                {/* APRESENTAÇÃO */}
                <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 7 } }}>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="overline"
                            color="primary.main"
                            fontWeight={800}
                            letterSpacing={2}
                        >
                            BEM-VINDO AO TUFFVALLEY
                        </Typography>

                        <Typography
                            variant="h2"
                            component="h1"
                            fontWeight={800}
                            color="text.primary"
                            sx={{
                                fontSize: {
                                    xs: '2.2rem',
                                    md: '3.5rem'
                                },
                                mt: 1,
                                mb: 2
                            }}
                        >
                            Desconecte-se um pouco.
                            <br />
                            <Box
                                component="span"
                                sx={{ color: 'primary.main' }}
                            >
                                Reconecte-se com a vida.
                            </Box>
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight={400}
                            sx={{
                                maxWidth: 720,
                                lineHeight: 1.7
                            }}
                        >
                            Descubra um ambiente onde o tempo desacelera,
                            as experiências ganham espaço e as conexões
                            acontecem além das telas.
                        </Typography>
                    </Box>

                    {/* CARROSSEL */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 1, md: 2 },
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            border: 1,
                            borderColor: 'divider',
                            overflow: 'hidden'
                        }}
                    >
                        <CustomCarousel />
                    </Paper>

                </Container>

                {/* APRESENTAÇÃO DO PROJETO */}
                <SectionContent />

                {/* CHAMADA PARA AÇÃO */}
                <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 8 } }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            borderRadius: 4,
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            fontWeight={800}
                            sx={{
                                fontSize: {
                                    xs: '1.6rem',
                                    md: '2.3rem'
                                },
                                mb: 2
                            }}
                        >
                            Que tal viver uma nova experiência?
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                maxWidth: 650,
                                mx: 'auto',
                                mb: 3,
                                opacity: 0.9,
                                lineHeight: 1.8
                            }}
                        >
                            Conheça nossas propostas e descubra como
                            pequenos momentos longe das telas podem
                            transformar sua rotina.
                        </Typography>

                        <Button
                            onClick={login}
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 700
                            }}
                        >
                            Conheça nossos planos
                        </Button>
                    </Paper>
                </Container>

            </main>

            {/* RODAPÉ */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    textAlign: 'center',
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    © {new Date().getFullYear()} TuffValley.
                    Todos os direitos reservados.
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Desconectar para reconectar.
                </Typography>
            </Box>

        </Box>
    );
}

export default App;
