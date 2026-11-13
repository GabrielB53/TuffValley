
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import MensagemService from "../../services/MensagemService";
import logo from "../../assets/images/home.png";

import {
    Alert,
    Button,
    CircularProgress
} from "@mui/material";

import { ThemeContext } from "../../contexts/ThemeContext";

import "./MensagemLer.css";

const MensagemLer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    const [mensagem, setMensagem] = useState({
        id: null,
        dataMensagem: "",
        email: "",
        emissor: "",
        texto: "",
        telefone: "",
        statusMensagem: ""
    });

    const [alerta, setAlerta] = useState({
        show: false,
        message: "",
        type: "info"
    });

    const [carregando, setCarregando] = useState(true);
    const [processando, setProcessando] = useState(false);

    useEffect(() => {
        carregarMensagem();
    }, [id]);

    const carregarMensagem = async () => {
        try {
            setCarregando(true);

            const response = await MensagemService.findById(id);
            setMensagem(response.data);

        } catch (error) {
            setAlerta({
                show: true,
                message: "Não foi possível carregar a mensagem.",
                type: "error"
            });
        } finally {
            setCarregando(false);
        }
    };

    const formatarData = (data) => {
        if (!data) return "Não informada";

        const dataFormatada = new Date(data);

        if (isNaN(dataFormatada.getTime())) return data;

        return dataFormatada.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const marcarComoLida = async () => {
        try {
            setProcessando(true);

            const response = await MensagemService.inativar(id);

            setAlerta({
                show: true,
                message: response.data.message || "Mensagem marcada como lida!",
                type: "success"
            });

            setTimeout(() => {
                navigate("/mensagem");
            }, 1500);

        } catch (error) {
            setAlerta({
                show: true,
                message: error.response?.data?.message ||
                    "Não foi possível atualizar a mensagem.",
                type: "error"
            });
        } finally {
            setProcessando(false);
        }
    };

    const mensagemLida =
        mensagem.statusMensagem?.toUpperCase() === "LIDA";

    return (
        <div className="mensagem-ler-layout">
            <Sidebar />

            <main className="mensagem-ler-content">
                <Header
                    goto="/mensagem"
                    title="Visualizar Mensagem"
                    logo={logo}
                />

                <div className="mensagem-ler-container">

                    <section className="mensagem-ler-heading">
                        <div>
                            <span className="mensagem-ler-overline">
                                CENTRAL DE COMUNICAÇÃO
                            </span>

                            <h1>Detalhes da mensagem</h1>

                            <p>
                                Consulte as informações e o conteúdo
                                enviado pelo remetente.
                            </p>
                        </div>

                        <div className="mensagem-ler-heading-icon">
                            <i className="bi bi-envelope-open"></i>
                        </div>
                    </section>

                    {alerta.show && (
                        <Alert
                            severity={alerta.type}
                            onClose={() => setAlerta({
                                show: false,
                                message: "",
                                type: "info"
                            })}
                        >
                            {alerta.message}
                        </Alert>
                    )}

                    {carregando ? (
                        <div className="mensagem-ler-loading">
                            <CircularProgress />
                            <p>Carregando mensagem...</p>
                        </div>
                    ) : (
                        <section className="mensagem-ler-card">

                            <div className="mensagem-ler-card-header">
                                <div>
                                    <span className="mensagem-ler-card-overline">
                                        MENSAGEM #{mensagem.id}
                                    </span>

                                    <h2>
                                        {mensagem.emissor || "Remetente não identificado"}
                                    </h2>
                                </div>

                                <span className={`mensagem-ler-status ${
                                    mensagemLida ? "status-lida" : "status-pendente"
                                }`}>
                                    <i className={`bi ${
                                        mensagemLida
                                            ? "bi-check-circle-fill"
                                            : "bi-envelope-fill"
                                    }`}></i>

                                    {mensagemLida ? "Lida" : "Não lida"}
                                </span>
                            </div>

                            <div className="mensagem-ler-divider"></div>

                            <div className="mensagem-ler-informacoes">

                                <div className="mensagem-ler-info-item">
                                    <span>
                                        <i className="bi bi-person"></i>
                                        Remetente
                                    </span>

                                    <strong>
                                        {mensagem.emissor || "Não informado"}
                                    </strong>
                                </div>

                                <div className="mensagem-ler-info-item">
                                    <span>
                                        <i className="bi bi-envelope"></i>
                                        E-mail
                                    </span>

                                    <strong>
                                        {mensagem.email || "Não informado"}
                                    </strong>
                                </div>

                                <div className="mensagem-ler-info-item">
                                    <span>
                                        <i className="bi bi-telephone"></i>
                                        Telefone
                                    </span>

                                    <strong>
                                        {mensagem.telefone || "Não informado"}
                                    </strong>
                                </div>

                                <div className="mensagem-ler-info-item">
                                    <span>
                                        <i className="bi bi-calendar-event"></i>
                                        Data de envio
                                    </span>

                                    <strong>
                                        {formatarData(mensagem.dataMensagem)}
                                    </strong>
                                </div>

                            </div>

                            <div className="mensagem-ler-divider"></div>

                            <div className="mensagem-ler-texto">
                                <div className="mensagem-ler-texto-heading">
                                    <i className="bi bi-chat-left-text"></i>
                                    <h3>Conteúdo da mensagem</h3>
                                </div>

                                <div className="mensagem-ler-texto-content">
                                    {mensagem.texto || "Esta mensagem não possui conteúdo."}
                                </div>
                            </div>

                            <div className="mensagem-ler-actions">
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/mensagem")}
                                    className="mensagem-ler-btn-voltar"
                                >
                                    <i className="bi bi-arrow-left"></i>
                                    Voltar
                                </Button>

                                {!mensagemLida && (
                                    <Button
                                        variant="contained"
                                        onClick={marcarComoLida}
                                        disabled={processando}
                                        className="mensagem-ler-btn-lida"
                                    >
                                        {processando ? (
                                            <CircularProgress
                                                size={18}
                                                color="inherit"
                                            />
                                        ) : (
                                            <>
                                                <i className="bi bi-check2-circle"></i>
                                                Marcar como lida
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>

                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MensagemLer;
