
import React from 'react';

import {
    Box,
    Typography,
    Paper,
    Chip,
    Stack
} from '@mui/material';

import './SectionContent.css';

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import NatureRoundedIcon from '@mui/icons-material/NatureRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

/* =========================================
   PILARES DA TUFFVALLEY
========================================= */

const pilares = [
    {
        numero: '01',
        titulo: 'Conexões humanas',
        descricao:
            'Valorizar encontros presenciais, fortalecer vínculos e criar espaço para relações mais próximas.',
        icon: <GroupsRoundedIcon aria-hidden="true" />
    },
    {
        numero: '02',
        titulo: 'Bem-estar e criatividade',
        descricao:
            'Descobrir novas formas de expressão por meio da arte, do relaxamento e do contato com a natureza.',
        icon: <SelfImprovementRoundedIcon aria-hidden="true" />
    },
    {
        numero: '03',
        titulo: 'Equilíbrio digital',
        descricao:
            'Construir uma relação mais consciente com a tecnologia, sem deixar que as telas ocupem todos os momentos.',
        icon: <BalanceRoundedIcon aria-hidden="true" />
    }
];

/* =========================================
   HISTÓRIA E PROPÓSITO
========================================= */

const historia = [
    {
        numero: '01',
        titulo: 'Por que precisamos desacelerar?',
        descricao:
            'A tecnologia facilita inúmeras atividades, mas sua presença constante pode reduzir o tempo dedicado à convivência, ao descanso e às experiências fora do ambiente digital. Encontrar equilíbrio tornou-se essencial para uma rotina mais consciente.'
    },
    {
        numero: '02',
        titulo: 'Nossa proposta',
        descricao:
            'A TuffValley busca proporcionar ambientes acolhedores e experiências que incentivem a desconexão temporária das telas. Por meio de atividades artísticas, relaxamento, contato com a natureza e interação social, queremos abrir espaço para novas vivências.'
    },
    {
        numero: '03',
        titulo: 'O que queremos transformar',
        descricao:
            'Queremos incentivar relações humanas mais próximas, estimular a criatividade e valorizar o tempo de qualidade. Não se trata de eliminar a tecnologia, mas de utilizá-la com consciência e permitir que outras experiências também façam parte da rotina.'
    }
];

/* =========================================
   COMPONENTE PRINCIPAL
========================================= */

const SectionContent = () => {
    return (
        <Box
            component="section"
            className="section-content"
            aria-label="Conheça a TuffValley"
        >

            {/* INTRODUÇÃO */}

            <Box className="section-heading">
                <Chip
                    icon={<SpaRoundedIcon aria-hidden="true" />}
                    label="QUEM SOMOS"
                    variant="outlined"
                    className="section-chip"
                />

                <Typography
                    variant="h2"
                    component="h2"
                    className="section-main-title"
                >
                    A vida acontece
                    <span> além das telas.</span>
                </Typography>

                <Typography
                    variant="body1"
                    className="section-subtitle"
                >
                    Um convite para desacelerar, explorar novas possibilidades
                    e aproveitar aquilo que realmente importa.
                </Typography>
            </Box>

            {/* ESSÊNCIA */}

            <Paper
                component="article"
                elevation={0}
                className="section-highlight"
                aria-labelledby="section-highlight-title"
            >
                <Box className="section-highlight-content">
                    <span className="section-eyebrow">
                        <NatureRoundedIcon aria-hidden="true" />
                        NOSSA ESSÊNCIA
                    </span>

                    <Typography
                        id="section-highlight-title"
                        variant="h4"
                        component="h3"
                        className="section-highlight-title"
                    >
                        A tecnologia conecta o mundo.
                        Mas também precisamos de tempo para viver
                        o que está ao nosso redor.
                    </Typography>

                    <Typography
                        variant="body1"
                        className="section-highlight-description"
                    >
                        Acreditamos que a tecnologia deve fazer parte da nossa
                        vida, mas não ocupar todo o espaço dela. Nossa proposta
                        é incentivar momentos de desconexão e experiências que
                        aproximem as pessoas do mundo real.
                    </Typography>
                </Box>

                <Box
                    className="section-highlight-decoration"
                    aria-hidden="true"
                >
                    <SpaRoundedIcon />
                    <span>Desacelere.</span>
                    <span>Explore.</span>
                    <span>Floresça.</span>
                </Box>
            </Paper>

            {/* PROPÓSITO E PILARES */}

            <Box className="section-content-grid">

                {/* NOSSA PROPOSTA */}

                <Box
                    component="section"
                    className="section-story"
                    aria-labelledby="section-story-title"
                >
                    <span className="section-eyebrow">
                        POR QUE EXISTIMOS
                    </span>

                    <Typography
                        id="section-story-title"
                        variant="h4"
                        component="h3"
                        className="section-story-title"
                    >
                        Mais espaço para viver o presente.
                    </Typography>

                    <Stack spacing={3} className="section-story-blocks">
                        {historia.map((item) => (
                            <Box
                                component="article"
                                className="section-story-item"
                                key={item.numero}
                            >
                                <span
                                    className="section-story-marker"
                                    aria-hidden="true"
                                >
                                    {item.numero}
                                </span>

                                <Box>
                                    <Typography
                                        variant="h6"
                                        component="h4"
                                        className="section-story-heading"
                                    >
                                        {item.titulo}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        className="section-story-text"
                                    >
                                        {item.descricao}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* PILARES */}

                <Box
                    component="section"
                    className="section-values"
                    aria-labelledby="section-values-title"
                >
                    <Box className="section-values-heading">
                        <span className="section-eyebrow">
                            O QUE NOS MOVE
                        </span>

                        <Typography
                            id="section-values-title"
                            variant="h4"
                            component="h3"
                            className="section-values-title"
                        >
                            Nossos pilares
                        </Typography>

                        <Typography
                            variant="body2"
                            className="section-values-description"
                        >
                            Três princípios que orientam cada experiência
                            que queremos proporcionar.
                        </Typography>
                    </Box>

                    <Stack spacing={2} className="section-pillars">
                        {pilares.map((pilar) => (
                            <Paper
                                component="article"
                                key={pilar.numero}
                                elevation={0}
                                className="section-pillar-card"
                            >
                                <Box className="section-pillar-top">
                                    <Box
                                        className="section-pillar-icon"
                                        aria-hidden="true"
                                    >
                                        {pilar.icon}
                                    </Box>

                                    <span
                                        className="section-pillar-number"
                                        aria-hidden="true"
                                    >
                                        {pilar.numero}
                                    </span>
                                </Box>

                                <Typography
                                    variant="h6"
                                    component="h4"
                                    className="section-pillar-title"
                                >
                                    {pilar.titulo}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    className="section-pillar-description"
                                >
                                    {pilar.descricao}
                                </Typography>

                                <ArrowOutwardRoundedIcon
                                    className="section-pillar-arrow"
                                    aria-hidden="true"
                                />
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* ENCERRAMENTO */}

            <Paper
                component="aside"
                elevation={0}
                className="section-quote"
                aria-label="Mensagem da TuffValley"
            >
                <Box
                    className="section-quote-icon"
                    aria-hidden="true"
                >
                    <FavoriteBorderRoundedIcon />
                </Box>

                <Box className="section-quote-content">
                    <span className="section-eyebrow">
                        UM CONVITE DA TUFFVALLEY
                    </span>

                    <Typography
                        variant="h4"
                        component="h3"
                        className="section-quote-title"
                    >
                        Mais momentos vividos.
                        <span> Menos momentos na tela.</span>
                    </Typography>

                    <Typography
                        variant="body1"
                        className="section-quote-description"
                    >
                        Desconectar para reconectar. Porque alguns dos melhores
                        momentos da vida acontecem quando estamos presentes.
                    </Typography>
                </Box>

                <SpaRoundedIcon
                    className="section-quote-decoration"
                    aria-hidden="true"
                />
            </Paper>

        </Box>
    );
};

export default SectionContent;
