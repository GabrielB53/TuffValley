
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import perfil from "../../assets/images/Logozinha.png";
import "./Sidebar.css";

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

// =========================================
// CONFIGURAÇÕES
// =========================================

const SIDEBAR_STORAGE_KEY = "tuffvalley-sidebar-collapsed";

const MENU_ITEMS = [
    {
        label: "Dashboard",
        path: "/home",
        icon: DashboardRoundedIcon
    },
    {
        label: "Mensagem",
        path: "/mensagem",
        icon: MessageRoundedIcon,
        adminOnly: true
    },
    {
        label: "Usuário",
        path: "/usuarioslista",
        icon: PeopleAltRoundedIcon,
        adminOnly: true
    },
    {
        label: "Gráfico",
        path: "/grafico",
        icon: BarChartRoundedIcon,
        adminOnly: true
    }
];

// =========================================
// FUNÇÕES AUXILIARES
// =========================================

// Recupera a preferência de exibição da sidebar
const getSavedSidebarState = () => {
    try {
        return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
    } catch {
        return false;
    }
};

// Verifica se a rota atual corresponde ao item
const isRouteActive = (currentPath, itemPath) => {
    return (
        currentPath === itemPath ||
        currentPath.startsWith(`${itemPath}/`)
    );
};

// =========================================
// COMPONENTE
// =========================================

const Sidebar = () => {

    const { currentUser, clearUser } = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();

    // =====================================
    // ESTADOS
    // =====================================

    const [collapsed, setCollapsed] = useState(getSavedSidebarState);

    // Persiste a preferência sempre que houver alteração
    useEffect(() => {
        try {
            localStorage.setItem(
                SIDEBAR_STORAGE_KEY,
                String(collapsed)
            );
        } catch {
            // A sidebar continua funcionando mesmo sem acesso ao storage.
        }
    }, [collapsed]);

    // =====================================
    // DADOS DO USUÁRIO
    // =====================================

    if (!currentUser) return null;

    const userName = currentUser.nome?.trim() || "Usuário";

    const userRole =
        currentUser.nivelAcesso?.toUpperCase() || "USER";

    const userId = currentUser.id;

    const isAdmin = userRole === "ADMIN";

    // Filtra os itens conforme o nível de acesso
    const visibleMenuItems = MENU_ITEMS.filter(
        (item) => !item.adminOnly || isAdmin
    );

    // =====================================
    // AÇÕES
    // =====================================

    const toggleSidebar = () => {
        setCollapsed((previousState) => !previousState);
    };

    const handleLogout = () => {
        clearUser();
        navigate("/", { replace: true });
    };

    const handleEditProfile = () => {
        if (!userId) return;

        navigate(`/usuarioperfil/${userId}`);
    };

    // =====================================
    // RENDERIZAÇÃO
    // =====================================

    return (
        <aside
            className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}
            aria-label="Menu principal do TuffValley"
        >

            {/* CABEÇALHO */}
            <div className="sidebar-header">

                {!collapsed && (
                    <span className="sidebar-header-title">
                        TuffValley
                    </span>
                )}

                <Tooltip
                    title={collapsed ? "Expandir menu" : "Recolher menu"}
                    placement="right"
                    arrow
                >
                    <IconButton
                        onClick={toggleSidebar}
                        className="sidebar-toggle"
                        aria-label={
                            collapsed ? "Expandir menu" : "Recolher menu"
                        }
                        aria-expanded={!collapsed}
                        type="button"
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

                <Tooltip
                    title={collapsed ? userName : ""}
                    placement="right"
                    arrow
                >
                    <Avatar
                        src={currentUser.foto || perfil}
                        alt={`Foto de perfil de ${userName}`}
                        className="sidebar-avatar"
                    />
                </Tooltip>

                {!collapsed && (
                    <>
                        <div className="sidebar-user-info">

                            <span className="sidebar-user-name">
                                {userName}
                            </span>

                            <span className="sidebar-user-role">
                                {userRole}
                            </span>

                        </div>

                        <ButtonGroup
                            variant="outlined"
                            size="small"
                            className="sidebar-profile-actions"
                        >

                            <Tooltip title="Sair da conta" arrow>
                                <Button
                                    onClick={handleLogout}
                                    aria-label="Sair da conta"
                                    type="button"
                                >
                                    <LogoutRoundedIcon fontSize="small" />
                                </Button>
                            </Tooltip>

                            <Tooltip title="Editar perfil" arrow>
                                <Button
                                    onClick={handleEditProfile}
                                    aria-label="Editar perfil"
                                    disabled={!userId}
                                    type="button"
                                >
                                    <AccountCircleRoundedIcon fontSize="small" />
                                </Button>
                            </Tooltip>

                        </ButtonGroup>
                    </>
                )}

                {collapsed && (
                    <div className="sidebar-collapsed-actions">

                        <Tooltip title="Editar perfil" placement="right" arrow>
                            <span>
                                <IconButton
                                    onClick={handleEditProfile}
                                    disabled={!userId}
                                    aria-label="Editar perfil"
                                    type="button"
                                >
                                    <AccountCircleRoundedIcon />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="Sair da conta" placement="right" arrow>
                            <IconButton
                                onClick={handleLogout}
                                aria-label="Sair da conta"
                                type="button"
                            >
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

                {visibleMenuItems.map((item) => {

                    const isActive = isRouteActive(
                        location.pathname,
                        item.path
                    );

                    const ItemIcon = item.icon;

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
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span className="sidebar-link-icon">
                                    <ItemIcon />
                                </span>

                                {!collapsed && (
                                    <span className="sidebar-link-label">
                                        {item.label}
                                    </span>
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

                    <small>
                        Conectando experiências.
                    </small>

                </div>
            )}

        </aside>
    );
};

export default Sidebar;
