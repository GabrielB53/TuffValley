import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/Logozinha.png";
import perfil from "../../assets/images/Logozinha.png";

import { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./UsuarioSenha.css";

const UsuarioAlterarSenha = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [usuario, setUsuario] = useState({
        id: null,
        nome: "",
        email: "",
        nivelAcesso: "",
        foto: ""
    });

    const [formData, setFormData] = useState({
        senha: "",
        newpass: ""
    });

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const senhasConferem =
        formData.senha.length > 0 &&
        formData.newpass.length > 0 &&
        formData.senha === formData.newpass;

    useEffect(() => {
        UsuarioService.findById(id)
            .then((response) => {
                setUsuario(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuário:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!senhasConferem) {
            setMessage("As senhas precisam ser iguais.");
            setSuccessful(false);
            setOpenDialog(true);
            return;
        }

        setCarregando(true);

        UsuarioService.alterarSenha(id, {
            senha: formData.senha
        })
            .then((response) => {
                setMessage(
                    response.data?.message ||
                    "Senha alterada com sucesso!"
                );
                setSuccessful(true);
                setOpenDialog(true);
            })
            .catch((error) => {
                const respMessage =
                    error.response?.data?.message ||
                    error.message ||
                    "Erro ao alterar senha.";

                setMessage(respMessage);
                setSuccessful(false);
                setOpenDialog(true);
            })
            .finally(() => {
                setCarregando(false);
            });
    };

    const goBack = () => {
        navigate(`/usuarioperfil/${usuario.id}`);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);

        if (successful) {
            UsuarioService.logout();
            navigate("/login");
        }
    };

    return (
        <div className="alterar-senha-layout d-flex">
            <Sidebar />

            <main className="alterar-senha-content w-100">

                <Header
                    goto="/home"
                    title="Alterar Senha"
                    logo={logo}
                />

                <section className="alterar-senha-container">

                    {/* Cabeçalho */}
                    <div className="alterar-senha-heading">
                        <div>
                            <span className="alterar-senha-overline">
                                SEGURANÇA DA CONTA
                            </span>

                            <h2>Atualização de senha</h2>

                            <p>
                                Mantenha sua conta protegida utilizando uma
                                senha segura e de sua preferência.
                            </p>
                        </div>

                        <div className="alterar-senha-heading-icon">
                            <i className="bi bi-shield-lock"></i>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="alterar-senha-card">

                        <div className="alterar-senha-card-header">
                            <div className="alterar-senha-card-icon">
                                <i className="bi bi-person-lock"></i>
                            </div>

                            <div>
                                <h3>Dados da conta</h3>
                                <span>Confirme sua identidade e defina uma nova senha.</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>

                            {/* Perfil */}
                            <div className="alterar-senha-profile">
                                <img
                                    src={usuario.foto || perfil}
                                    alt="Foto de perfil do usuário"
                                />

                                <div>
                                    <strong>{usuario.nome || "Carregando..."}</strong>
                                    <span>{usuario.email}</span>
                                    <small>
                                        <i className="bi bi-shield-check"></i>
                                        Atualização de credenciais
                                    </small>
                                </div>
                            </div>

                            <div className="alterar-senha-divider"></div>

                            {/* Campos */}
                            <div className="alterar-senha-fields">

                                <div className="alterar-senha-field">
                                    <label htmlFor="senha">
                                        Nova senha
                                    </label>

                                    <div className="alterar-senha-input-wrapper">
                                        <i className="bi bi-lock"></i>

                                        <input
                                            type={mostrarSenha ? "text" : "password"}
                                            id="senha"
                                            name="senha"
                                            placeholder="Digite sua nova senha"
                                            value={formData.senha}
                                            onChange={handleChange}
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setMostrarSenha(!mostrarSenha)}
                                            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                        >
                                            <i className={`bi ${mostrarSenha ? "bi-eye-slash" : "bi-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="alterar-senha-field">
                                    <label htmlFor="newpass">
                                        Confirmar nova senha
                                    </label>

                                    <div className={`alterar-senha-input-wrapper ${
                                        formData.newpass.length > 0
                                            ? senhasConferem
                                                ? "senha-valida"
                                                : "senha-invalida"
                                            : ""
                                    }`}>
                                        <i className="bi bi-lock-fill"></i>

                                        <input
                                            type={mostrarSenha ? "text" : "password"}
                                            id="newpass"
                                            name="newpass"
                                            placeholder="Digite novamente sua senha"
                                            value={formData.newpass}
                                            onChange={handleChange}
                                            required
                                        />

                                        {formData.newpass.length > 0 && (
                                            <i className={`bi ${
                                                senhasConferem
                                                    ? "bi-check-circle-fill"
                                                    : "bi-exclamation-circle-fill"
                                            } senha-feedback-icon`}></i>
                                        )}
                                    </div>

                                    {formData.newpass.length > 0 && (
                                        <span className={`alterar-senha-feedback ${
                                            senhasConferem ? "feedback-success" : "feedback-error"
                                        }`}>
                                            {senhasConferem
                                                ? "As senhas conferem!"
                                                : "As senhas não conferem."
                                            }
                                        </span>
                                    )}
                                </div>

                            </div>

                            {/* Dica de segurança */}
                            <div className="alterar-senha-tip">
                                <i className="bi bi-info-circle"></i>

                                <span>
                                    Utilize uma senha que seja difícil de
                                    adivinhar e evite compartilhar suas credenciais.
                                </span>
                            </div>

                            {/* Botões */}
                            <div className="alterar-senha-actions">

                                <button
                                    type="button"
                                    className="alterar-senha-cancel"
                                    onClick={goBack}
                                >
                                    <i className="bi bi-arrow-left"></i>
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="alterar-senha-submit"
                                    disabled={!senhasConferem || carregando}
                                >
                                    <i className={`bi ${
                                        carregando
                                            ? "bi-arrow-repeat"
                                            : "bi-shield-check"
                                    }`}></i>

                                    {carregando
                                        ? "Salvando..."
                                        : "Salvar nova senha"
                                    }
                                </button>

                            </div>

                        </form>
                    </div>

                    <div className="alterar-senha-security-note">
                        <i className="bi bi-shield-check"></i>
                        <span>Seus dados são tratados com segurança.</span>
                    </div>

                </section>
            </main>

            {/* Modal */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="dialog-title"
                PaperProps={{
                    className: "alterar-senha-dialog"
                }}
            >
                <DialogTitle id="dialog-title">
                    <div className="alterar-senha-dialog-title">
                        <i className={`bi ${
                            successful
                                ? "bi-check-circle-fill"
                                : "bi-exclamation-circle-fill"
                        }`}></i>

                        {successful ? "Senha alterada!" : "Não foi possível alterar"}
                    </div>
                </DialogTitle>

                <DialogContent dividers>
                    <Typography>
                        {message || "Ocorreu um problema durante a operação."}
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        variant="contained"
                        autoFocus
                    >
                        {successful ? "Acessar o sistema" : "Fechar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UsuarioAlterarSenha;
