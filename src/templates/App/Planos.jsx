
import React from "react";
import { Link } from "react-router-dom";

import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import YardRoundedIcon from "@mui/icons-material/YardRounded";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import WeekendRoundedIcon from "@mui/icons-material/WeekendRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

import "./Planos.css";

const planos = [
    {
        id: 1,
        nome: "Broto",
        subtitulo: "O primeiro passo para descobrir novas experiências.",
        area: "Acesso essencial",
        preco: 89.90,
        descricao:
            "Ideal para quem deseja começar a explorar os estabelecimentos parceiros e aproveitar novas experiências.",
        icon: <SpaRoundedIcon />,
        destaque: false,
        recursos: [
            "Acesso a estabelecimentos parceiros selecionados",
            "Opções de lazer e bem-estar",
            "Benefícios e descontos disponíveis",
            "Consulta de parceiros pela plataforma",
            "Acesso às categorias essenciais"
        ]
    },
    {
        id: 2,
        nome: "Cultivo",
        subtitulo: "Mais possibilidades para sua rotina florescer.",
        area: "Acesso ampliado",
        preco: 179.90,
        descricao:
            "Uma opção equilibrada para quem deseja aproveitar uma variedade maior de estabelecimentos e experiências.",
        icon: <YardRoundedIcon />,
        destaque: true,
        recursos: [
            "Todos os benefícios do Broto",
            "Maior variedade de estabelecimentos parceiros",
            "Opções de atividades físicas",
            "Experiências gastronômicas e de lazer",
            "Benefícios especiais em parceiros participantes",
            "Acesso a diferentes categorias da plataforma"
        ]
    },
    {
        id: 3,
        nome: "Colheita",
        subtitulo: "Uma experiência completa de possibilidades.",
        area: "Acesso completo",
        preco: 329.90,
        descricao:
            "Para quem deseja explorar diferentes categorias e aproveitar uma experiência mais abrangente na TuffValley.",
        icon: <ForestRoundedIcon />,
        destaque: false,
        recursos: [
            "Todos os benefícios do Cultivo",
            "Acesso ampliado às categorias disponíveis",
            "Mais opções de bem-estar e autocuidado",
            "Experiências em lazer e entretenimento",
            "Ofertas especiais de parceiros participantes",
            "Acesso a novidades da plataforma",
            "Maior variedade de experiências disponíveis"
        ]
    }
];

const Planos = () => {
    const formatarPreco = (valor) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };

    return (
        <div className="planos-layout">
            <main className="planos-main">

                {/* Apresentação */}
                <section className="planos-hero">
                    <div className="planos-hero-content">
                        <span className="planos-eyebrow">
                            TUFFVALLEY · DESCUBRA NOVAS EXPERIÊNCIAS
                        </span>

                        <h1>
                            Mais possibilidades para
                            <span> aproveitar a vida.</span>
                        </h1>

                        <p>
                            Descubra uma plataforma que conecta você a
                            diferentes estabelecimentos e experiências.
                            Explore academias, cafeterias, salões, espaços
                            de bem-estar e muito mais em um só lugar.
                        </p>

                        <a
                            href="#planos-disponiveis"
                            className="planos-hero-button"
                        >
                            Conhecer os planos
                            <span>↓</span>
                        </a>
                    </div>

                    <div className="planos-hero-decoration">
                        <div className="planos-hero-circle">
                            <ExploreRoundedIcon />
                        </div>

                        <span className="decorative-leaf leaf-one">✿</span>
                        <span className="decorative-leaf leaf-two">❋</span>
                        <span className="decorative-leaf leaf-three">✦</span>
                    </div>
                </section>

                {/* Benefícios */}
                <section className="planos-benefits">
                    <article>
                        <div className="planos-benefit-icon">
                            <FitnessCenterRoundedIcon />
                        </div>

                        <div>
                            <h3>Atividades físicas</h3>
                            <p>
                                Descubra academias e opções para movimentar
                                sua rotina.
                            </p>
                        </div>
                    </article>

                    <article>
                        <div className="planos-benefit-icon">
                            <LocalCafeRoundedIcon />
                        </div>

                        <div>
                            <h3>Gastronomia</h3>
                            <p>
                                Conheça cafeterias e estabelecimentos
                                gastronômicos parceiros.
                            </p>
                        </div>
                    </article>

                    <article>
                        <div className="planos-benefit-icon">
                            <WeekendRoundedIcon />
                        </div>

                        <div>
                            <h3>Bem-estar e lazer</h3>
                            <p>
                                Explore experiências de autocuidado,
                                relaxamento e entretenimento.
                            </p>
                        </div>
                    </article>
                </section>

                {/* Planos */}
                <section
                    className="planos-section"
                    id="planos-disponiveis"
                >
                    <div className="planos-section-heading">
                        <span className="planos-eyebrow">
                            ENCONTRE SUA EXPERIÊNCIA
                        </span>

                        <h2>Escolha seu plano</h2>

                        <p>
                            Diferentes possibilidades para você aproveitar
                            os estabelecimentos e benefícios da TuffValley.
                        </p>
                    </div>

                    <div className="planos-grid">
                        {planos.map((plano) => (
                            <article
                                key={plano.id}
                                className={`plano-card ${
                                    plano.destaque ? "plano-destaque" : ""
                                }`}
                            >
                                {plano.destaque && (
                                    <div className="plano-recomendado">
                                        <StarRoundedIcon />
                                        Mais escolhido
                                    </div>
                                )}

                                <div className="plano-card-header">
                                    <div className="plano-icon">
                                        {plano.icon}
                                    </div>

                                    <h3>{plano.nome}</h3>

                                    <p>{plano.subtitulo}</p>
                                </div>

                                <div className="plano-area">
                                    <span>Categoria de acesso</span>
                                    <strong>{plano.area}</strong>
                                </div>

                                <div className="plano-preco">
                                    <span>A partir de</span>
                                    <strong>
                                        {formatarPreco(plano.preco)}
                                    </strong>
                                    <small>/ mês</small>
                                </div>

                                <p className="plano-descricao">
                                    {plano.descricao}
                                </p>

                                <div className="plano-divider" />

                                <h4>O que está incluído</h4>

                                <ul className="plano-recursos">
                                    {plano.recursos.map((recurso, index) => (
                                        <li key={index}>
                                            <CheckCircleRoundedIcon />
                                            <span>{recurso}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#interesse"
                                    className={`plano-button ${
                                        plano.destaque
                                            ? "plano-button-featured"
                                            : ""
                                    }`}
                                >
                                    Tenho interesse
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Informações adicionais */}
                <section className="planos-extra">
                    <div className="planos-extra-icon">
                        <LocalOfferRoundedIcon />
                    </div>

                    <div>
                        <h2>Um mundo de possibilidades.</h2>

                        <p>
                            A TuffValley aproxima você de estabelecimentos
                            parceiros e experiências que podem fazer parte
                            da sua rotina. Explore diferentes categorias,
                            conheça novos lugares e aproveite os benefícios
                            disponíveis em cada parceiro.
                        </p>
                    </div>
                </section>

                {/* Interesse */}
                <section
                    className="planos-contact"
                    id="interesse"
                >
                    <div>
                        <span className="planos-eyebrow">
                            VAMOS DESCOBRIR?
                        </span>

                        <h2>Encontre novas experiências.</h2>

                        <p>
                            Conheça os estabelecimentos parceiros,
                            consulte as condições dos planos e descubra
                            tudo o que a TuffValley pode oferecer.
                        </p>
                    </div>

                    <Link to="/" className="planos-contact-button">
                        Voltar ao início
                    </Link>
                </section>

                {/* Rodapé */}
                <footer className="planos-footer">
                    <span>TUFFVALLEY</span>

                    <p>
                        Novas experiências, novas possibilidades.
                    </p>

                    <small>
                        * Valores e condições ilustrativos para apresentação
                        do projeto acadêmico. Os benefícios dependem dos
                        estabelecimentos parceiros.
                    </small>
                </footer>

            </main>
        </div>
    );
};

export default Planos;
