
import React from "react";
import "./ContentHome.css";

import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import BalanceRoundedIcon from "@mui/icons-material/BalanceRounded";

const ContentHome = () => {
    const benefits = [
        {
            icon: <SpaRoundedIcon />,
            title: "Bem-estar",
            description:
                "Um ambiente acolhedor para descansar, relaxar e cuidar de si."
        },
        {
            icon: <GroupsRoundedIcon />,
            title: "Conexões humanas",
            description:
                "Momentos de convivência que fortalecem os relacionamentos interpessoais."
        },
        {
            icon: <PsychologyRoundedIcon />,
            title: "Desenvolvimento pessoal",
            description:
                "Atividades que estimulam a criatividade, a concentração e o autoconhecimento."
        },
        {
            icon: <BalanceRoundedIcon />,
            title: "Equilíbrio digital",
            description:
                "Uma relação mais consciente e saudável com a tecnologia."
        }
    ];

    return (
        <section className="content-home">

            {/* APRESENTAÇÃO */}
            <div className="content-home-intro">
                <span className="content-home-eyebrow">
                    NOSSA PROPOSTA
                </span>

                <h2>Uma breve descrição sobre a gente!</h2>

                <p className="content-home-highlight">
                    Desconectar-se um pouco também é uma forma de
                    reconectar-se com aquilo que realmente importa.
                </p>
            </div>

            {/* CONTEXTO */}
            <div className="content-home-text">
                <h3>Por que existimos?</h3>

                <p>
                    Na sociedade contemporânea, a tecnologia está cada
                    vez mais presente no cotidiano das pessoas,
                    facilitando a comunicação, o acesso à informação e
                    a realização de diversas atividades. Entretanto,
                    o uso excessivo de aparelhos eletrônicos,
                    especialmente celulares e computadores, pode
                    prejudicar a concentração, a produtividade, a
                    convivência social e o bem-estar mental.
                </p>

                <p>
                    Diante dessa realidade, torna-se importante buscar
                    alternativas que incentivem uma relação mais
                    equilibrada entre a vida digital e as experiências
                    offline.
                </p>
            </div>

            {/* PROPOSTA */}
            <div className="content-home-text">
                <h3>O que queremos proporcionar?</h3>

                <p>
                    Este projeto tem como propósito desenvolver um
                    espaço voltado à desconexão temporária da
                    tecnologia, proporcionando aos frequentadores um
                    ambiente seguro, confortável e acolhedor, no qual
                    possam aproveitar momentos de lazer, descanso e
                    desenvolvimento pessoal.
                </p>

                <p>
                    Por meio de atividades artísticas, práticas de
                    relaxamento, contato com a natureza e oportunidades
                    de interação social, buscamos estimular a
                    valorização das relações humanas e das experiências
                    longe das telas.
                </p>
            </div>

            {/* BENEFÍCIOS */}
            <div className="content-home-benefits">
                <h3>O que valorizamos</h3>

                <div className="content-home-grid">
                    {benefits.map((benefit, index) => (
                        <article
                            className="content-home-card"
                            key={index}
                        >
                            <div className="content-home-icon">
                                {benefit.icon}
                            </div>

                            <h4>{benefit.title}</h4>

                            <p>{benefit.description}</p>
                        </article>
                    ))}
                </div>
            </div>

            {/* CONCLUSÃO */}
            <div className="content-home-conclusion">
                <h3>Mais experiências, menos telas.</h3>

                <p>
                    A intenção não é eliminar a tecnologia da vida
                    das pessoas, mas demonstrar a importância de
                    utilizá-la de maneira moderada, evitando que seu
                    uso excessivo interfira negativamente nos estudos,
                    no trabalho e nas relações interpessoais.
                </p>

                <p>
                    Assim, queremos demonstrar que reduzir o tempo
                    dedicado aos dispositivos eletrônicos pode abrir
                    espaço para novas experiências, aprendizados e
                    conexões humanas, promovendo uma relação mais
                    consciente com a tecnologia e valorizando o
                    bem-estar físico, mental e social.
                </p>
            </div>

        </section>
    );
};

export default ContentHome;
