
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";

import CustomCarousel from "../../components/Carousel/Carousel";
import ContentHome from "../../components/Secoes/ContentHome";

import { useUser } from "../../contexts/UserContext";

import "./Home.css";

const Home = () => {
    const { currentUser } = useUser();

    const primeiroNome = currentUser?.nome?.trim()
        ? currentUser.nome.trim().split(" ")[0]
        : "cultivador";

    return (
        <div className="home-layout">

            <Sidebar />

            <div className="home-content">

                <Header
                    goto="/"
                    title="Inicial"
                    logo={logo}
                />

                <main className="home-dashboard">

                    {/* BOAS-VINDAS */}
                    <section className="home-welcome">
                        <div className="home-welcome-content">

                            <span className="home-eyebrow">
                                <span className="home-eyebrow-dot" />
                                SEU ESPAÇO TUFFVALLEY
                            </span>

                            <h2>
                                Olá, {primeiroNome}!
                            </h2>

                            <p>
                                Cada experiência é uma oportunidade
                                de florescer. Explore novos espaços,
                                descubra possibilidades e aproveite
                                tudo o que a TuffValley preparou para você.
                            </p>

                        </div>

                        <div
                            className="home-welcome-decoration"
                            aria-hidden="true"
                        >
                            <span className="home-decoration-circle" />
                            <span className="home-decoration-circle home-decoration-circle-secondary" />
                        </div>
                    </section>

                    {/* EXPLORAÇÃO DE ESPAÇOS */}
                    <section
                        className="home-carousel-section"
                        aria-label="Exploração de espaços"
                    >

                        <div className="home-section-heading">
                            <div>
                                <span className="home-section-eyebrow">
                                    DESCUBRA
                                </span>

                                <h3>
                                    Explore novos espaços
                                </h3>

                                <p>
                                    Encontre experiências que combinam
                                    com o seu momento.
                                </p>
                            </div>
                        </div>

                        <CustomCarousel />

                    </section>

                    {/* CONTEÚDO DO DASHBOARD */}
                    <section className="home-main">
                        <ContentHome />
                    </section>

                </main>

            </div>

        </div>
    );
};

export default Home;
