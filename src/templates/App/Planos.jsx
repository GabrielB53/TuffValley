
import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";

import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import YardRoundedIcon from "@mui/icons-material/YardRounded";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import "./Planos.css";

const planos = [
    {
        id: 1,
        nome: "Broto",
        subtitulo: "O primeiro passo para cultivar.",
        area: "2 m²",
        preco: 89.90,
        descricao: "Ideal para quem deseja começar a cultivar e aproveitar um espaço próprio na estufa.",
        icon: <SpaRoundedIcon />,
        destaque: false,
        recursos: [
            "Área exclusiva de 2 m²",
            "Acesso à estufa em horário comercial",
            "Acesso à água para irrigação",
            "Orientações básicas de cultivo",
            "Espaço para plantas de pequeno porte"
        ]
    },
    {
        id: 2,
        nome: "Cultivo",
        subtitulo: "Mais espaço para suas ideias florescerem.",
        area: "5 m²",
        preco: 179.90,
        descricao: "Uma opção equilibrada para quem deseja cultivar diferentes espécies e ampliar suas possibilidades.",
        icon: <YardRoundedIcon />,
        destaque: true,
        recursos: [
            "Área exclusiva de 5 m²",
            "Acesso à estufa em horário comercial",
            "Acesso à água para irrigação",
            "Orientações de cultivo",
            "Espaço para diferentes espécies",
            "Prioridade na reserva de atividades"
        ]
    },
    {
        id: 3,
        nome: "Colheita",
        subtitulo: "Uma experiência completa de cultivo.",
        area: "10 m²",
        preco: 329.90,
        descricao: "Para quem deseja mais liberdade, espaço e possibilidades dentro da estufa.",
        icon: <ForestRoundedIcon />,
        destaque: false,
        recursos: [
            "Área exclusiva de 10 m²",
            "Acesso à estufa em horário comercial",
            "Acesso à água para irrigação",
            "Orientações personalizadas de cultivo",
            "Espaço para diversas espécies",
            "Prioridade na reserva de atividades",
            "Identificação personalizada da área"
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
            <Sidebar />

            <div className="planos-content">
                <Header
                    goto="/home"
                    title="Nossos planos"
                    logo={logo}
                />

                <main className="planos-main">

                    {/* Apresentação */}
                    <section className="planos-hero">
                        <div className="planos-hero-content">
                            <span className="planos-eyebrow">
                                TUFFVALLEY · CULTIVE SUA EXPERIÊNCIA
                            </span>

                            <h1>
                                Seu espaço para
                                <span> cultivar novas possibilidades.</span>
                            </h1>

                            <p>
                                Escolha a área ideal para você e descubra uma
                                nova maneira de se conectar com a natureza.
                                Na TuffValley, cada espaço é uma oportunidade
                                para plantar, cuidar e acompanhar o crescimento
                                das suas ideias.
                            </p>

                            <a href="#planos-disponiveis" className="planos-hero-button">
                                Conhecer os planos
                                <span>↓</span>
                            </a>
                        </div>

                        <div className="planos-hero-decoration">
                            <div className="planos-hero-circle">
                                <LocalFloristRoundedIcon />
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
                                <SpaRoundedIcon />
                            </div>
                            <div>
                                <h3>Seu próprio espaço</h3>
                                <p>Uma área reservada para desenvolver seu cultivo.</p>
                            </div>
                        </article>

                        <article>
                            <div className="planos-benefit-icon">
                                <WaterDropRoundedIcon />
                            </div>
                            <div>
                                <h3>Estrutura de apoio</h3>
                                <p>Acesso à água e à estrutura compartilhada da estufa.</p>
                            </div>
                        </article>

                        <article>
                            <div className="planos-benefit-icon">
                                <WbSunnyRoundedIcon />
                            </div>
                            <div>
                                <h3>Contato com a natureza</h3>
                                <p>Uma experiência que incentiva cuidado e bem-estar.</p>
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
                                ENCONTRE SEU ESPAÇO
                            </span>

                            <h2>Escolha seu plano</h2>

                            <p>
                                Três possibilidades para diferentes objetivos
                                e tamanhos de cultivo.
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
                                        <span>Área disponível</span>
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
                            <LocalFloristRoundedIcon />
                        </div>

                        <div>
                            <h2>Um espaço, muitas possibilidades.</h2>
                            <p>
                                Independentemente do plano escolhido, a
                                proposta é oferecer um ambiente organizado,
                                acolhedor e preparado para que você aproveite
                                sua experiência de cultivo.
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
                                VAMOS COMEÇAR?
                            </span>

                            <h2>Encontre o espaço ideal para você.</h2>

                            <p>
                                Consulte a disponibilidade das áreas e conheça
                                as condições de utilização da estufa.
                            </p>
                        </div>

                        <Link to="/home" className="planos-contact-button">
                            Voltar ao início
                        </Link>
                    </section>

                    <footer className="planos-footer">
                        <span>TUFFVALLEY</span>
                        <p>
                            Cultive novas experiências, no seu próprio ritmo.
                        </p>
                        <small>
                            * Valores e condições ilustrativos para apresentação
                            do projeto acadêmico.
                        </small>
                    </footer>

                </main>
            </div>
        </div>
    );
};

export default Planos;
