
import { useContext, useState } from "react";

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
    Tooltip,
    IconButton
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Sidebar = () => {

    const { currentUser, clearUser } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);

    const logout = () => {
        clearUser();
        navigate("/");
    };

    const editar = () => {
        navigate(`/usuarioperfil/${currentUser.id}`);
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
        <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

            {/* CABEÇALHO DA SIDEBAR */}
            <div className="sidebar-header">

                {!collapsed && (
                    <span className="sidebar-header-title">
                        TuffValley
                    </span>
                )}

                <Tooltip title={collapsed ? "Expandir menu" : "Recolher menu"}>
                    <IconButton
                        onClick={() => setCollapsed(!collapsed)}
                        className="sidebar-toggle"
                        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                    >
                        {collapsed
                            ? <MenuRoundedIcon />
                            : <MenuOpenRoundedIcon />
                        }
                    </IconButton>
                </Tooltip>

            </div>

            {/* PERFIL */}
            <div className="sidebar-profile">

                <Tooltip title={collapsed ? currentUser.nome : ""}>
                    <Avatar
                        src={currentUser.foto || perfil}
                        alt={currentUser.nome}
                        className="sidebar-avatar"
                    />
                </Tooltip>

                {!collapsed && (
                    <>
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
                                <Button onClick={editar}>
                                    <AccountCircleRoundedIcon fontSize="small" />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </>
                )}

                {collapsed && (
                    <div className="sidebar-collapsed-actions">

                        <Tooltip title="Editar perfil">
                            <IconButton onClick={editar}>
                                <AccountCircleRoundedIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Sair da conta">
                            <IconButton onClick={logout}>
                                <LogoutRoundedIcon />
                            </IconButton>
                        </Tooltip>

                    </div>
                )}

            </div>

            <Divider className="sidebar-divider" />

            {/* NAVEGAÇÃO */}
            <nav className="sidebar-navigation">

                {!collapsed && (
                    <span className="sidebar-section-title">
                        MENU PRINCIPAL
                    </span>
                )}

                {menuItems.map((item) => {

                    const isActive = location.pathname === item.path;

                    return (
                        <Tooltip
                            key={item.path}
                            title={collapsed ? item.label : ""}
                            placement="right"
                            arrow
                        >
                            <Link
                                to={item.path}
                                className={`sidebar-link ${
                                    isActive ? "active" : ""
                                }`}
                            >
                                <span className="sidebar-link-icon">
                                    {item.icon}
                                </span>

                                {!collapsed && (
                                    <span>{item.label}</span>
                                )}
                            </Link>
                        </Tooltip>
                    );
                })}

            </nav>

            {/* RODAPÉ */}
            {!collapsed && (
                <div className="sidebar-footer">
                    <span>TuffValley</span>
                    <small>Conectando experiências.</small>
                </div>
            )}

        </aside>
    );
};

export default Sidebar;
