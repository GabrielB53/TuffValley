
import React from 'react';

import {
    Box,
    Container,
    Typography,
    Paper,
    Chip,
    Divider,
    Stack
} from '@mui/material';

const pilares = [
    {
        numero: '01',
        titulo: 'Conexões humanas',
        descricao:
            'Valorizar as relações presenciais, a convivência e o fortalecimento dos laços interpessoais.'
    },
    {
        numero: '02',
        titulo: 'Bem-estar e criatividade',
        descricao:
            'Incentivar atividades artísticas, relaxamento, contato com a natureza e desenvolvimento pessoal.'
    },
    {
        numero: '03',
        titulo: 'Equilíbrio digital',
        descricao:
            'Promover uma relação mais consciente e moderada com a tecnologia no cotidiano.'
    }
];

const SectionContent = () => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>

            {/* CABEÇALHO */}
            <Box sx={{ mb: 5 }}>
                <Chip
                    label="QUEM SOMOS"
                    color="primary"
                    variant="outlined"
                    sx={{
                        mb: 2,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        borderRadius: 2
                    }}
                />

                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={800}
                    sx={{
                        color: 'text.primary',
                        mb: 2,
                        fontSize: { xs: '2rem', md: '3rem' }
                    }}
                >
                    Uma pausa para se reconectar.
                </Typography>

                <Typography
                    variant="h6"
                    component="p"
                    color="text.secondary"
                    fontWeight={400}
                    sx={{
                        maxWidth: 750,
                        lineHeight: 1.7
                    }}
                >
                    Um espaço dedicado a desacelerar, descobrir novas
                    experiências e valorizar aquilo que acontece além das telas.
                </Typography>
            </Box>

            {/* DESTAQUE PRINCIPAL */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    mb: 4,
                    borderRadius: 4,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Typography
                    variant="overline"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 2,
                        opacity: 0.8
                    }}
                >
                    NOSSA ESSÊNCIA
                </Typography>

                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight={700}
                    sx={{
                        maxWidth: 800,
                        lineHeight: 1.35,
                        my: 2,
                        fontSize: { xs: '1.5rem', md: '2.2rem' }
                    }}
                >
                    A tecnologia conecta o mundo.
                    Mas também precisamos de tempo para viver o que está ao nosso redor.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: 700,
                        opacity: 0.9,
                        lineHeight: 1.8
                    }}
                >
                    Nossa proposta não é abandonar a tecnologia, mas encontrar
                    um equilíbrio entre o mundo digital e as experiências reais.
                </Typography>
            </Paper>

            {/* CONTEÚDO */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: '1.6fr 1fr'
                    },
                    gap: 3,
                    alignItems: 'start'
                }}
            >

                {/* TEXTO INSTITUCIONAL */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        borderColor: 'divider'
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h2"
                        fontWeight={700}
                        color="text.primary"
                        mb={3}
                    >
                        Nossa proposta
                    </Typography>

                    <Stack spacing={3}>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary.main"
                                mb={1}
                            >
                                O cenário atual
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                lineHeight={1.9}
                            >
                                Na sociedade contemporânea, a tecnologia está
                                cada vez mais presente no cotidiano das pessoas,
                                facilitando a comunicação, o acesso à informação
                                e a realização de diversas atividades. Entretanto,
                                o uso excessivo de aparelhos eletrônicos,
                                especialmente celulares e computadores, pode
                                prejudicar a concentração, a produtividade,
                                a convivência social e o bem-estar mental.
                                Diante dessa realidade, torna-se importante
                                buscar alternativas que incentivem uma relação
                                mais equilibrada entre a vida digital e as
                                experiências offline.
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary.main"
                                mb={1}
                            >
                                O que queremos proporcionar
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                lineHeight={1.9}
                            >
                                Este projeto tem como propósito desenvolver
                                um espaço voltado à desconexão temporária da
                                tecnologia, proporcionando aos frequentadores
                                um ambiente seguro, confortável e acolhedor,
                                no qual possam aproveitar momentos de lazer,
                                descanso e desenvolvimento pessoal. Por meio
                                de atividades artísticas, práticas de
                                relaxamento, contato com a natureza e
                                oportunidades de interação social, buscamos
                                estimular a valorização das relações humanas
                                e das vivências longe das telas.
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary.main"
                                mb={1}
                            >
                                Nosso propósito
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                lineHeight={1.9}
                            >
                                Além disso, a proposta pretende fortalecer
                                laços interpessoais, estimular a criatividade,
                                a concentração e a organização das tarefas
                                cotidianas. A intenção não é eliminar a
                                tecnologia da vida das pessoas, mas demonstrar
                                a importância de utilizá-la de maneira
                                moderada, evitando que seu uso excessivo
                                interfira negativamente nos estudos, no
                                trabalho e nas relações interpessoais.
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary.main"
                                mb={1}
                            >
                                O impacto que buscamos
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                lineHeight={1.9}
                            >
                                Dessa forma, o projeto busca oferecer uma
                                alternativa de lazer e convivência que valorize
                                as experiências presenciais e o equilíbrio
                                entre as responsabilidades e os momentos de
                                descanso. Espera-se que o espaço contribua
                                positivamente para a conscientização dos
                                frequentadores sobre os impactos do uso
                                excessivo das telas, incentivando a construção
                                de rotinas mais equilibradas, produtivas e
                                saudáveis.
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary.main"
                                mb={1}
                            >
                                Mais experiências, menos telas
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                lineHeight={1.9}
                            >
                                Assim, a iniciativa pretende demonstrar que
                                a redução do tempo dedicado aos dispositivos
                                eletrônicos pode abrir espaço para novas
                                experiências, aprendizados e conexões humanas,
                                promovendo uma relação mais consciente com a
                                tecnologia e valorizando aspectos fundamentais
                                do bem-estar físico, mental e social.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* PILARES DO PROJETO */}
                <Stack spacing={2}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            border: 1,
                            borderColor: 'divider'
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            fontWeight={700}
                            color="text.primary"
                            mb={1}
                        >
                            Nossos pilares
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            lineHeight={1.7}
                            mb={3}
                        >
                            Três princípios que orientam nossa iniciativa.
                        </Typography>

                        <Stack spacing={3}>
                            {pilares.map((pilar) => (
                                <Box key={pilar.numero}>
                                    <Typography
                                        variant="overline"
                                        color="primary.main"
                                        fontWeight={800}
                                    >
                                        {pilar.numero}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        color="text.primary"
                                        mb={0.5}
                                    >
                                        {pilar.titulo}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        lineHeight={1.8}
                                    >
                                        {pilar.descricao}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>

                    {/* FRASE FINAL */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            bgcolor: 'secondary.main',
                            color: 'secondary.contrastText'
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            mb={1}
                        >
                            Desconectar para reconectar.
                        </Typography>

                        <Typography
                            variant="body2"
                            lineHeight={1.8}
                        >
                            Porque alguns dos melhores momentos da vida
                            acontecem quando deixamos o celular de lado.
                        </Typography>
                    </Paper>
                </Stack>
            </Box>
        </Container>
    );
};

export default SectionContent;
