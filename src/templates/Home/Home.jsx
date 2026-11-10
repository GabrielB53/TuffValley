
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";

import CustomCarousel from "../../components/Carousel/Carousel";
import ContentHome from "../../components/Secoes/ContentHome";

import "./Home.css";

const Home = () => {
    return (
        <div className="home-layout">

            <Sidebar />

            <div className="home-content">

                <Header
                    goto="/"
                    title="Inicial"
                    logo={logo}
                />

                <div className="home-dashboard">

                    <section className="home-welcome">
                        <div className="home-welcome-heading">
                            <span className="home-eyebrow">
                                TUFFVALLEY
                            </span>

                            <h2>Bem-vindo!</h2>

                            <p>
                                Explore o sistema e acompanhe as
                                informações disponíveis.
                            </p>
                        </div>
                    </section>

                    <section className="home-carousel-section">
                        <CustomCarousel />
                    </section>

                    <main className="home-main">
                        <ContentHome />
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Home;
