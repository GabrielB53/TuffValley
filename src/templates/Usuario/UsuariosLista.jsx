
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Menu/Sidebar";
import Header from "../../components/Header/Header";
import UsuarioService from "../../services/UsuarioService";

import {
    Alert,
    Badge,
    Button,
    CircularProgress
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import logo from "../../assets/images/home.png";
import "./UsuarioLista.css";

const RECORDS_PER_PAGE = [6, 8, 10];

const UsuariosLista = () => {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [search, setSearch] = useState("");
    const [mostrarInativas, setMostrarInativas] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const [loading, setLoading] = useState(true);
    const [alerta, setAlerta] = useState({
        show: false,
        message: "",
        type: "info"
    });

    // Carrega todos os usuários
    const findAll = async () => {
        setLoading(true);

        try {
            const response = await UsuarioService.findAll();
            const data = Array.isArray(response.data) ? response.data : [];

            setUsuarios(data);
            setPage(0);
            setAlerta({
                show: false,
                message: "",
                type: "info"
            });
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);

            setUsuarios([]);
            setAlerta({
                show: true,
                message: "Não foi possível carregar os usuários.",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    // Busca usuários pelo nome
    const findByNome = async (e) => {
        e?.preventDefault();

        const nome = search.trim();

        if (!nome) {
            findAll();
            return;
        }

        setLoading(true);

        try {
            const response = await UsuarioService.findByNome(nome);

            const data = Array.isArray(response.data)
                ? response.data
                : response.data
                    ? [response.data]
                    : [];

            setUsuarios(data);
            setPage(0);

            setAlerta({
                show: true,
                message: data.length > 0
                    ? `${data.length} usuário(s) encontrado(s).`
                    : "Nenhum usuário encontrado.",
                type: data.length > 0 ? "success" : "warning"
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);

            setUsuarios([]);
            setPage(0);

            setAlerta({
                show: true,
                message: "Erro ao realizar a busca.",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    // Carrega a lista ao abrir a página
    useEffect(() => {
        findAll();
    }, []);

    // Filtra antes de realizar a paginação
    const usuariosFiltrados = useMemo(() => {
        return usuarios.filter((usuario) => {
            return mostrarInativas || usuario.statusUsuario !== "INATIVO";
        });
    }, [usuarios, mostrarInativas]);

    const totalPages = Math.ceil(
        usuariosFiltrados.length / rowsPerPage
    );

    // Registros que serão exibidos na página atual
    const usuariosPaginados = useMemo(() => {
        const inicio = page * rowsPerPage;

        return usuariosFiltrados.slice(
            inicio,
            inicio + rowsPerPage
        );
    }, [usuariosFiltrados, page, rowsPerPage]);

    // Mantém a página válida quando o filtro muda
    useEffect(() => {
        if (page >= totalPages && page !== 0) {
            setPage(Math.max(0, totalPages - 1));
        }
    }, [page, totalPages]);

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(0);
    };

    const handleToggleInativas = () => {
        setMostrarInativas((prev) => !prev);
        setPage(0);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleOpenUser = (id) => {
        navigate(`/usuarioeditar/${id}`);
    };

    const formatarData = (data) => {
        if (!data) return "—";

        const dataObjeto = new Date(data);

        if (Number.isNaN(dataObjeto.getTime())) {
            return "—";
        }

        return dataObjeto.toLocaleDateString("pt-BR");
    };

    const limparBusca = () => {
        setSearch("");
        findAll();
    };

    return (
        <div className="usuarios-lista-layout">
            <Sidebar />

            <div className="usuarios-lista-content">
                <Header
                    goto="/home"
                    title="Lista de usuários"
                    logo={logo}
                />

                <main className="usuarios-lista-main">

                    {/* Cabeçalho da página */}
                    <section className="usuarios-lista-heading">
                        <div>
                            <span className="usuarios-lista-eyebrow">
                                GERENCIAMENTO
                            </span>

                            <h2>Usuários cadastrados</h2>

                            <p>
                                Consulte, pesquise e gerencie os usuários
                                registrados no sistema.
                            </p>
                        </div>

                        <div className="usuarios-lista-heading-icon">
                            <ManageAccountsRoundedIcon />
                        </div>
                    </section>

                    {/* Conteúdo principal */}
                    <section className="usuarios-lista-card">

                        {/* Busca */}
                        <form
                            className="usuarios-lista-search"
                            onSubmit={findByNome}
                        >
                            <div className="usuarios-lista-search-field">
                                <SearchRoundedIcon />

                                <input
                                    type="text"
                                    id="inputSearch"
                                    placeholder="Pesquisar usuário pelo nome..."
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                className="usuarios-lista-search-button"
                                disabled={loading}
                            >
                                <SearchRoundedIcon />
                                Pesquisar
                            </Button>

                            <Button
                                type="button"
                                variant="outlined"
                                className="usuarios-lista-reset-button"
                                onClick={limparBusca}
                                disabled={loading}
                            >
                                <RefreshRoundedIcon />
                                Limpar
                            </Button>
                        </form>

                        {/* Alertas */}
                        {alerta.show && (
                            <Alert
                                severity={alerta.type}
                                onClose={() => setAlerta({
                                    show: false,
                                    message: "",
                                    type: "info"
                                })}
                                className="usuarios-lista-alert"
                            >
                                {alerta.message}
                            </Alert>
                        )}

                        {/* Indicadores e filtros */}
                        <div className="usuarios-lista-toolbar">

                            <div className="usuarios-lista-counter">
                                <div className="usuarios-lista-counter-icon">
                                    <ManageAccountsRoundedIcon />
                                </div>

                                <div>
                                    <span>Total cadastrado</span>

                                    <strong>
                                            <span className="usuarios-lista-counter-number">
                                                {usuarios.length}
                                            </span>
                                    </strong>
                                </div>
                            </div>

                            <Button
                                variant={mostrarInativas ? "contained" : "outlined"}
                                onClick={handleToggleInativas}
                                className="usuarios-lista-inactive-button"
                            >
                                <PersonOffRoundedIcon />
                                {mostrarInativas
                                    ? "Ocultar inativos"
                                    : "Mostrar inativos"}
                            </Button>
                        </div>

                        {/* Tabela */}
                        <div className="usuarios-lista-table-wrapper">

                            {loading ? (
                                <div className="usuarios-lista-loading">
                                    <CircularProgress />
                                    <p>Carregando usuários...</p>
                                </div>
                            ) : usuariosPaginados.length === 0 ? (
                                <div className="usuarios-lista-empty">
                                    <PersonSearchRoundedIcon />

                                    <h3>Nenhum usuário encontrado</h3>

                                    <p>
                                        Não existem registros para os filtros
                                        selecionados.
                                    </p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table usuarios-lista-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nome</th>
                                                <th>E-mail</th>
                                                <th>Acesso</th>
                                                <th>Cadastro</th>
                                                <th>Status</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {usuariosPaginados.map((usuario) => (
                                                <tr key={usuario.id}>
                                                    <td className="text-center">
                                                        {usuario.id}
                                                    </td>

                                                    <td className="usuarios-lista-name">
                                                        {usuario.nome || "—"}
                                                    </td>

                                                    <td>
                                                        {usuario.email || "—"}
                                                    </td>

                                                    <td>
                                                        <span className="usuarios-lista-access">
                                                            {usuario.nivelAcesso || "—"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {formatarData(usuario.dataCadastro)}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`usuarios-lista-status ${
                                                                usuario.statusUsuario === "INATIVO"
                                                                    ? "status-inativo"
                                                                    : "status-ativo"
                                                            }`}
                                                        >
                                                            {usuario.statusUsuario || "—"}
                                                        </span>
                                                    </td>

                                                    <td className="text-center">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            className="usuarios-lista-open-button"
                                                            onClick={() => handleOpenUser(usuario.id)}
                                                        >
                                                            <ManageAccountsRoundedIcon />
                                                            Abrir
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Rodapé e paginação */}
                        {!loading && (
                            <div className="usuarios-lista-footer">

                                <span className="usuarios-lista-record-count">
                                    Exibindo {usuariosPaginados.length} de{" "}
                                    {usuariosFiltrados.length} registros
                                </span>

                                <div className="usuarios-lista-pagination">

                                    <label htmlFor="itensPorPagina">
                                        Registros por página:
                                    </label>

                                    <select
                                        id="itensPorPagina"
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                    >
                                        {RECORDS_PER_PAGE.map((quantidade) => (
                                            <option
                                                value={quantidade}
                                                key={quantidade}
                                            >
                                                {quantidade}
                                            </option>
                                        ))}
                                    </select>

                                    {totalPages > 1 && (
                                        <div className="usuarios-lista-page-buttons">
                                            <button
                                                type="button"
                                                disabled={page === 0}
                                                onClick={() => setPage((prev) => prev - 1)}
                                                aria-label="Página anterior"
                                            >
                                                &laquo;
                                            </button>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, index) => (
                                                    <button
                                                        type="button"
                                                        key={index}
                                                        className={
                                                            page === index
                                                                ? "active"
                                                                : ""
                                                        }
                                                        onClick={() => setPage(index)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                )
                                            )}

                                            <button
                                                type="button"
                                                disabled={page >= totalPages - 1}
                                                onClick={() => setPage((prev) => prev + 1)}
                                                aria-label="Próxima página"
                                            >
                                                &raquo;
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default UsuariosLista;
