
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";
import Comp from "../../components/Grafico/Graficos";

import "./Grafico.css";

const Grafico = () => {
    return (
        <div className="grafico-page">
            <Sidebar />

            <main className="grafico-main">
                <Header
                    goto="/home"
                    title="Análise de Dados"
                    logo={logo}
                />

                <div className="grafico-page-content">

                    <section className="grafico-intro">
                        <div className="grafico-intro-text">
                            <span className="grafico-overline">
                                PAINEL DE GESTÃO
                            </span>

                            <h1>Análise de desempenho</h1>

                            <p>
                                Acompanhe a ocupação das áreas da estufa,
                                visualize tendências e obtenha informações
                                que auxiliam no planejamento e na gestão
                                dos espaços disponíveis.
                            </p>
                        </div>

                        <div className="grafico-intro-icon">
                            <i className="bi bi-bar-chart-line"></i>
                        </div>
                    </section>

                    <section className="grafico-section">

                        <Comp />
                    </section>

                </div>
            </main>
        </div>
    );
};

export default Grafico;
