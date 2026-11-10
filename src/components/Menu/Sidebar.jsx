
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import perfil from "../../assets/images/Logozinha.png";
import "./Sidebar.css";

import { Link, useNavigate, useLocation } from "react-router-dom";

import {
    Avatar,
    Button,
    ButtonGroup,
    Divider,
    Tooltip
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Sidebar = () => {

    const { currentUser, clearUser } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        clearUser();
        navigate("/");
    };

    const editar = (id) => {
        navigate(`/usuarioperfil/${id}`);
    };

    const menuItems = [
        {
            label: "Dashboard",
            path: "/home",
            icon: <DashboardRoundedIcon />
        },
        {
            label: "Mensagem",
            path: "/mensagem",
            icon: <MessageRoundedIcon />
        },
        {
            label: "Usuário",
            path: "/usuario",
            icon: <PeopleAltRoundedIcon />
        },
        {
            label: "Gráfico",
            path: "/grafico",
            icon: <BarChartRoundedIcon />
        }
    ];

    if (!currentUser) return null;

    return (
        <aside className="sidebar">

            {/* Perfil */}
            <div className="sidebar-profile">

                <Avatar
                    src={currentUser.foto || perfil}
                    alt={currentUser.nome}
                    className="sidebar-avatar"
                />

                <div className="sidebar-user-info">
                    <span className="sidebar-user-name">
                        {currentUser.nome}
                    </span>

                    <span className="sidebar-user-role">
                        {currentUser.nivelAcesso || "USER"}
                    </span>
                </div>

                <ButtonGroup
                    variant="outlined"
                    size="small"
                    className="sidebar-profile-actions"
                >
                    <Tooltip title="Sair da conta">
                        <Button onClick={logout}>
                            <LogoutRoundedIcon fontSize="small" />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Editar perfil">
                        <Button onClick={() => editar(currentUser.id)}>
                            <AccountCircleRoundedIcon fontSize="small" />
                        </Button>
                    </Tooltip>
                </ButtonGroup>

            </div>

            <Divider className="sidebar-divider" />

            {/* Navegação */}
            <nav className="sidebar-navigation">

                <span className="sidebar-section-title">
                    MENU PRINCIPAL
                </span>

                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-link ${
                            location.pathname === item.path ? "active" : ""
                        }`}
                    >
                        <span className="sidebar-link-icon">
                            {item.icon}
                        </span>

                        <span>{item.label}</span>
                    </Link>
                ))}

            </nav>

            <div className="sidebar-footer">
                <span>TuffValley</span>
                <small>Conectando experiências.</small>
            </div>

        </aside>
    );
};

export default Sidebar;
