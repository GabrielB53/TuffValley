
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import MensagemService from "../../services/MensagemService";
import logo from "../../assets/images/home.png";

import {
    Alert,
    Button,
    CircularProgress
} from "@mui/material";

import "./SendMessage.css";

const SendMessage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emissor: "",
        email: "",
        telefone: "",
        texto: ""
    });

    const [alerta, setAlerta] = useState({
        show: false,
        message: "",
        type: "info"
    });

    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const exibirAlerta = (message, type = "info") => {
        setAlerta({
            show: true,
            message,
            type
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.emissor.trim() ||
            !formData.email.trim() ||
            !formData.telefone.trim() ||
            !formData.texto.trim()
        ) {
            exibirAlerta(
                "Preencha todos os campos antes de enviar.",
                "warning"
            );
            return;
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            formData.email.trim()
        );

        if (!emailValido) {
            exibirAlerta(
                "Informe um endereço de e-mail válido.",
                "warning"
            );
            return;
        }

        try {
            setEnviando(true);

            await MensagemService.create({
                emissor: formData.emissor.trim(),
                email: formData.email.trim(),
                telefone: formData.telefone.trim(),
                texto: formData.texto.trim()
            });

            exibirAlerta(
                "Mensagem enviada com sucesso! Redirecionando...",
                "success"
            );

            setTimeout(() => {
                navigate("/mensagem");
            }, 1800);

        } catch (error) {
            const msg =
                error.response?.data?.message ||
                "Não foi possível enviar sua mensagem. Tente novamente.";

            exibirAlerta(msg, "error");

        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="send-message-layout">
            <Sidebar />

            <main className="send-message-content">
                <Header
                    goto="/mensagem"
                    title="Enviar mensagem"
                    logo={logo}
                />

                <div className="send-message-container">

                    <section className="send-message-heading">
                        <div>
                            <span className="send-message-overline">
                                CENTRAL DE COMUNICAÇÃO
                            </span>

                            <h1>Nova mensagem</h1>

                            <p>
                                Entre em contato com nossa equipe.
                                Preencha seus dados e envie sua mensagem
                                para que possamos atendê-lo.
                            </p>
                        </div>

                        <div className="send-message-heading-icon">
                            <i className="bi bi-envelope-paper"></i>
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

                    <section className="send-message-card">

                        <div className="send-message-card-header">
                            <div>
                                <h2>Informações de contato</h2>
                                <p>
                                    Identifique-se para que possamos
                                    responder sua solicitação.
                                </p>
                            </div>

                            <i className="bi bi-person-lines-fill"></i>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>

                            <div className="send-message-fields">

                                <div className="send-message-field">
                                    <label htmlFor="emissor">
                                        Nome completo
                                    </label>

                                    <input
                                        id="emissor"
                                        type="text"
                                        name="emissor"
                                        placeholder="Digite seu nome"
                                        value={formData.emissor}
                                        onChange={handleChange}
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div className="send-message-field">
                                    <label htmlFor="email">
                                        E-mail
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="exemplo@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        maxLength={150}
                                        required
                                    />
                                </div>

                                <div className="send-message-field">
                                    <label htmlFor="telefone">
                                        Telefone
                                    </label>

                                    <input
                                        id="telefone"
                                        type="tel"
                                        name="telefone"
                                        placeholder="(00) 00000-0000"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        maxLength={20}
                                        required
                                    />
                                </div>

                                <div className="send-message-field send-message-textarea-field">
                                    <label htmlFor="texto">
                                        Sua mensagem
                                    </label>

                                    <textarea
                                        id="texto"
                                        name="texto"
                                        placeholder="Descreva sua dúvida, sugestão ou solicitação..."
                                        value={formData.texto}
                                        onChange={handleChange}
                                        rows={6}
                                        maxLength={2000}
                                        required
                                    />

                                    <span className="send-message-counter">
                                        {formData.texto.length}/2000 caracteres
                                    </span>
                                </div>

                            </div>

                            <div className="send-message-divider"></div>

                            <div className="send-message-actions">

                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/mensagem")}
                                    disabled={enviando}
                                    className="send-message-cancel"
                                >
                                    <i className="bi bi-arrow-left"></i>
                                    Voltar
                                </Button>

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={enviando}
                                    className="send-message-submit"
                                >
                                    {enviando ? (
                                        <>
                                            <CircularProgress
                                                size={18}
                                                color="inherit"
                                            />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-send"></i>
                                            Enviar mensagem
                                        </>
                                    )}
                                </Button>

                            </div>

                        </form>
                    </section>

                    <div className="send-message-tip">
                        <i className="bi bi-info-circle"></i>

                        <span>
                            Certifique-se de que seus dados de contato
                            estão corretos para facilitar nosso retorno.
                        </span>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SendMessage;
