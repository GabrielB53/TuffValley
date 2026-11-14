
import "./ContentHome.css";

import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import BalanceRoundedIcon from "@mui/icons-material/BalanceRounded";

const benefits = [
    {
        icon: <SpaRoundedIcon />,
        title: "Bem-estar",
        description:
            "Descubra espaços e experiências que incentivam o cuidado pessoal e uma rotina mais equilibrada."
    },
    {
        icon: <GroupsRoundedIcon />,
        title: "Conexões humanas",
        description:
            "Aproveite ambientes que aproximam pessoas e proporcionam momentos de convivência."
    },
    {
        icon: <PsychologyRoundedIcon />,
        title: "Novas experiências",
        description:
            "Amplie seus horizontes conhecendo atividades, serviços e lugares diferentes."
    },
    {
        icon: <BalanceRoundedIcon />,
        title: "Liberdade de escolha",
        description:
            "Encontre experiências que combinam com seus interesses, necessidades e estilo de vida."
    }
];

const ContentHome = () => {
    return (
        <section className="content-home">

            {/* APRESENTAÇÃO */}
            <div className="content-home-intro">

                <span className="content-home-eyebrow">
                    CULTIVE NOVAS EXPERIÊNCIAS
                </span>

                <h2>
                    Um mundo de possibilidades em um só lugar.
                </h2>

                <p className="content-home-highlight">
                    Acreditamos que uma vida mais rica começa quando
                    abrimos espaço para conhecer novos lugares,
                    experimentar coisas diferentes e aproveitar cada momento.
                </p>

            </div>

            {/* SOBRE A PLATAFORMA */}
            <div className="content-home-text">

                <span className="content-home-section-label">
                    NOSSA ESSÊNCIA
                </span>

                <h3>
                    O que é a TuffValley?
                </h3>

                <p>
                    A TuffValley é uma plataforma que conecta pessoas
                    a diferentes espaços e estabelecimentos parceiros,
                    reunindo oportunidades de lazer, cuidado pessoal,
                    atividade física e convivência em um só ambiente.
                </p>

                <p>
                    Nossa proposta é tornar mais simples a descoberta
                    de novas experiências, permitindo que cada pessoa
                    encontre opções que façam sentido para sua rotina,
                    seus interesses e seu momento de vida.
                </p>

            </div>

            {/* PROPOSTA */}
            <div className="content-home-text">

                <span className="content-home-section-label">
                    NOSSO PROPÓSITO
                </span>

                <h3>
                    Mais possibilidades para sua rotina.
                </h3>

                <p>
                    Acreditamos que os melhores momentos podem surgir
                    de experiências simples: conhecer uma cafeteria,
                    experimentar uma nova atividade física, cuidar da
                    aparência ou descobrir um lugar diferente.
                </p>

                <p>
                    Por isso, buscamos aproximar nossos usuários de
                    estabelecimentos e serviços parceiros, criando
                    oportunidades para explorar, aproveitar e cultivar
                    novas experiências.
                </p>

            </div>

            {/* BENEFÍCIOS */}
            <div className="content-home-benefits">

                <div className="content-home-benefits-heading">
                    <span className="content-home-section-label">
                        O QUE NOS MOVE
                    </span>

                    <h3>
                        Os pilares da nossa experiência
                    </h3>

                    <p>
                        Mais do que encontrar lugares, queremos
                        proporcionar motivos para explorar.
                    </p>
                </div>

                <div className="content-home-grid">

                    {benefits.map((benefit) => (
                        <article
                            className="content-home-card"
                            key={benefit.title}
                        >
                            <div className="content-home-icon">
                                {benefit.icon}
                            </div>

                            <h4>
                                {benefit.title}
                            </h4>

                            <p>
                                {benefit.description}
                            </p>
                        </article>
                    ))}

                </div>
            </div>

            {/* CONCLUSÃO */}
            <div className="content-home-conclusion">

                <div className="content-home-conclusion-icon">
                    <SpaRoundedIcon />
                </div>

                <div className="content-home-conclusion-content">

                    <span className="content-home-section-label">
                        CULTIVE SEU PRÓXIMO MOMENTO
                    </span>

                    <h3>
                        Sua próxima experiência começa aqui.
                    </h3>

                    <p>
                        Seja para cuidar de si, encontrar pessoas,
                        experimentar algo novo ou simplesmente mudar
                        um pouco a rotina, a TuffValley está aqui para
                        aproximar você de novas possibilidades.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default ContentHome;
