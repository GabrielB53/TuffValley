
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import logo from "../../assets/images/Logozinha.png";
import "./AcessoNegado.css";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";

const AcessoNegado = () => {
    const { isUserLoaded } = useUser();
    const navigate = useNavigate();

    if (!isUserLoaded) {
        return null;
    }

    return (
        <main className="access-denied-page">
            <div className="access-denied-container">

                <Header
                    goto="/"
                    title="Acesso restrito"
                    logo={logo}
                />

                <section className="access-denied-content">

                    <div className="access-denied-decoration">
                        <SpaRoundedIcon className="access-denied-leaf" />
                    </div>

                    <div className="access-denied-icon">
                        <LockRoundedIcon />
                    </div>

                    <span className="access-denied-eyebrow">
                        Área protegida
                    </span>

                    <h1>
                        Ops! Este espaço ainda não é seu.
                    </h1>

                    <p className="access-denied-description">
                        Parece que você tentou acessar uma área que exige
                        permissões especiais. Não se preocupe, suas plantas
                        continuam crescendo por aqui!
                    </p>

                    <div className="access-denied-notice">
                        <LockRoundedIcon />
                        <span>
                            O acesso é permitido somente para usuários autorizados.
                        </span>
                    </div>

                    <button
                        className="access-denied-button"
                        onClick={() => navigate("/")}
                    >
                        <HomeRoundedIcon />
                        Voltar para o início
                    </button>

                    <span className="access-denied-footer">
                        <SpaRoundedIcon />
                        Cultive novas possibilidades com a TuffValley.
                    </span>

                </section>
            </div>
        </main>
    );
};

export default AcessoNegado;
