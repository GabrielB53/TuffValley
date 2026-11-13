
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";

import { useEffect, useState } from "react";
import MensagemService from "../../services/MensagemService";

import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import "./Mensagem.css";

const Mensagem = () => {
    const navigate = useNavigate();

    const [mensagens, setMensagens] = useState([]);
    const [mostrarLidas, setMostrarLidas] = useState(false);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        MensagemService.findAll()
            .then((response) => {
                setMensagens(response.data || []);
                setErro(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar mensagens:", error);
                setErro(true);
            });
    }, []);

    const lerMensagem = (id) => {
        navigate(`/mensagemler/${id}`);
    };

    const mensagensFiltradas = mensagens.filter(
        (mensagem) => mostrarLidas || mensagem.statusMensagem !== "LIDA"
    );

    const mensagensNaoLidas = mensagens.filter(
        (mensagem) => mensagem.statusMensagem !== "LIDA"
    ).length;

    const formatarData = (data) => {
        if (!data) return "Não informada";

        const dataObj = new Date(data);

        if (Number.isNaN(dataObj.getTime())) return "Data inválida";

        return dataObj.toLocaleDateString("pt-BR");
    };

    return (
        <div className="mensagem-layout d-flex">
            <Sidebar />

            <main className="mensagem-content w-100">

                <Header
                    goto="/home"
                    title="Central de Mensagens"
                    logo={logo}
                />

                <section className="mensagem-container">

                    {/* Cabeçalho */}
                    <div className="mensagem-heading">
                        <div>
                            <span className="mensagem-overline">
                                COMUNICAÇÃO
                            </span>

                            <h2>Central de mensagens</h2>

                            <p>
                                Acompanhe as mensagens recebidas e mantenha
                                a comunicação com os usuários.
                            </p>
                        </div>

                        <div className="mensagem-heading-icon">
                            <i className="bi bi-envelope-paper"></i>
                        </div>
                    </div>

                    {/* Indicadores */}
                    <div className="mensagem-stats">

                        <div className="mensagem-stat-card">
                            <div className="mensagem-stat-icon total-icon">
                                <i className="bi bi-envelope"></i>
                            </div>

                            <div>
                                <span>Total de mensagens</span>
                                <strong>{mensagens.length}</strong>
                            </div>
                        </div>

                        <div className="mensagem-stat-card">
                            <div className="mensagem-stat-icon pending-icon">
                                <i className="bi bi-envelope-exclamation"></i>
                            </div>

                            <div>
                                <span>Não lidas</span>
                                <strong>{mensagensNaoLidas}</strong>
                            </div>
                        </div>

                        <div className="mensagem-stat-card">
                            <div className="mensagem-stat-icon read-icon">
                                <i className="bi bi-envelope-check"></i>
                            </div>

                            <div>
                                <span>Lidas</span>
                                <strong>{mensagens.length - mensagensNaoLidas}</strong>
                            </div>
                        </div>

                    </div>

                    {/* Ações */}
                    <div className="mensagem-actions-card">

                        <div className="mensagem-actions-description">
                            <h3>Gerenciar mensagens</h3>
                            <span>Escolha uma ação para continuar.</span>
                        </div>

                        <div className="mensagem-actions">

                            <Link
                                to="/mensagemlista"
                                className="mensagem-action-button action-list"
                            >
                                <i className="bi bi-list-ul"></i>
                                <span>Lista completa</span>
                            </Link>

                            <Button
                                variant="contained"
                                className="mensagem-action-button action-filter"
                                onClick={() => setMostrarLidas(!mostrarLidas)}
                            >
                                <i className={`bi ${mostrarLidas
                                    ? "bi-envelope"
                                    : "bi-envelope-check"
                                }`}></i>

                                <span>
                                    {mostrarLidas
                                        ? "Ocultar lidas"
                                        : "Mostrar lidas"
                                    }
                                </span>
                            </Button>

                            <Link
                                to="/sendmessage"
                                className="mensagem-action-button action-send"
                            >
                                <i className="bi bi-send"></i>
                                <span>Enviar mensagem</span>
                            </Link>

                        </div>
                    </div>

                    {/* Tabela */}
                    <div className="mensagem-table-card">

                        <div className="mensagem-table-header">
                            <div>
                                <h3>
                                    <i className="bi bi-inbox"></i>
                                    Caixa de entrada
                                </h3>

                                <span>
                                    {mostrarLidas
                                        ? "Exibindo todas as mensagens."
                                        : "Exibindo apenas mensagens não lidas."
                                    }
                                </span>
                            </div>

                            <Badge
                                badgeContent={mensagensFiltradas.length}
                                color="success"
                                max={999}
                            >
                                <span className="mensagem-table-badge">
                                    Registros
                                </span>
                            </Badge>
                        </div>

                        {erro ? (
                            <div className="mensagem-empty">
                                <i className="bi bi-exclamation-circle"></i>
                                <strong>Não foi possível carregar as mensagens.</strong>
                                <span>Tente atualizar a página.</span>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="mensagem-table">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Data</th>
                                            <th>Emissor</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {mensagensFiltradas.length > 0 ? (
                                            mensagensFiltradas.map((mensagem) => {
                                                const lida =
                                                    mensagem.statusMensagem === "LIDA";

                                                return (
                                                    <tr key={mensagem.id}>

                                                        <td className="mensagem-id">
                                                            #{mensagem.id}
                                                        </td>

                                                        <td>
                                                            {formatarData(mensagem.dataMensagem)}
                                                        </td>

                                                        <td>
                                                            <div className="mensagem-emissor">
                                                                <div className="mensagem-avatar">
                                                                    <i className="bi bi-person"></i>
                                                                </div>

                                                                <span>
                                                                    {mensagem.emissor}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="mensagem-email">
                                                            {mensagem.email}
                                                        </td>

                                                        <td>
                                                            <span className={`mensagem-status ${
                                                                lida
                                                                    ? "mensagem-lida"
                                                                    : "mensagem-nao-lida"
                                                            }`}>
                                                                <i className={`bi ${
                                                                    lida
                                                                        ? "bi-check-circle"
                                                                        : "bi-circle-fill"
                                                                }`}></i>

                                                                {mensagem.statusMensagem}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="mensagem-open-button"
                                                                onClick={() => lerMensagem(mensagem.id)}
                                                                title={`Abrir mensagem ${mensagem.id}`}
                                                            >
                                                                <i className="bi bi-folder2-open"></i>
                                                                Abrir
                                                            </button>
                                                        </td>

                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="6">
                                                    <div className="mensagem-empty">
                                                        <i className="bi bi-inbox"></i>

                                                        <strong>
                                                            Nenhuma mensagem encontrada
                                                        </strong>

                                                        <span>
                                                            {mostrarLidas
                                                                ? "Não existem mensagens cadastradas."
                                                                : "Não há mensagens não lidas no momento."
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        )}

                        <div className="mensagem-table-footer">
                            <span>
                                Exibindo <strong>{mensagensFiltradas.length}</strong> de{" "}
                                <strong>{mensagens.length}</strong> mensagens.
                            </span>
                        </div>

                    </div>

                </section>
            </main>
        </div>
    );
};

export default Mensagem;
