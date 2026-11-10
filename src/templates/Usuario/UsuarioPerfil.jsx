
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal";
import ThemeToggleButton from "../../components/Botoes/TrocarCor";

import UsuarioService from "../../services/UsuarioService";
import { useUser } from "../../contexts/UserContext";

import logo from "../../assets/images/Logozinha.png";
import perfil from "../../assets/images/Logozinha.png";

import {
    Avatar,
    Button,
    CircularProgress
} from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

import "./UsuarioPerfil.css";

const UsuarioPerfil = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { currentUser, setCurrentUser } = useUser();

    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState("");
    const [dataFile, setDataFile] = useState(null);
    const [chosenImage, setChosenImage] = useState(null);

    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const carregarUsuario = async () => {
            setLoading(true);
            setLoadError(false);

            try {
                const response = await UsuarioService.findById(id);
                const dados = response.data;

                setUsuario(dados);
                setNome(dados.nome || "");
                setChosenImage(dados.foto || null);

            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
                setLoadError(true);

            } finally {
                setLoading(false);
            }
        };

        carregarUsuario();
    }, [id]);

    const setFile = (file) => {
        setDataFile(file);
    };

    const setImage = (img) => {
        setChosenImage(img);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome.trim()) {
            setSuccessful(false);
            setMessage("O nome não pode ficar vazio.");
            return;
        }

        setSaving(true);
        setMessage("");

        const form = new FormData();

        form.append("nome", nome.trim());

        // Preserva o nível de acesso atual.
        if (usuario?.nivelAcesso) {
            form.append("nivelAcesso", usuario.nivelAcesso);
        }

        if (dataFile) {
            form.append("file", dataFile);
        }

        try {
            await UsuarioService.updateProfile(id, form);

            const response = await UsuarioService.findById(id);
            const dadosAtualizados = response.data;

            setUsuario(dadosAtualizados);
            setNome(dadosAtualizados.nome || "");
            setChosenImage(dadosAtualizados.foto || null);
            setDataFile(null);

            // Atualiza o contexto somente se o perfil editado
            // pertencer ao usuário atualmente autenticado.
            if (
                currentUser &&
                String(currentUser.id) === String(dadosAtualizados.id)
            ) {
                setCurrentUser(dadosAtualizados);
            }

            setSuccessful(true);
            setMessage("Alterações salvas com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);

            setSuccessful(false);
            setMessage("Não foi possível salvar as alterações. Tente novamente.");

        } finally {
            setSaving(false);
        }
    };

    const goToAlterarSenha = () => {
        navigate(`/usuarioalterarsenha/${id}`);
    };

    if (loading) {
        return (
            <div className="perfil-loading">
                <CircularProgress />
                <p>Carregando perfil...</p>
            </div>
        );
    }

    if (loadError || !usuario) {
        return (
            <div className="perfil-loading">
                <InfoRoundedIcon fontSize="large" />
                <h3>Não foi possível carregar o perfil.</h3>
                <Button
                    variant="contained"
                    onClick={() => navigate("/home")}
                >
                    Voltar para o início
                </Button>
            </div>
        );
    }

    return (
        <div className="perfil-layout">

            <Sidebar />

            <div className="perfil-content">

                <Header
                    goto="/home"
                    title="Perfil de Usuário"
                    logo={logo}
                />

                <main className="perfil-main">

                    <form
                        className="perfil-card"
                        onSubmit={handleSubmit}
                    >

                        {/* CABEÇALHO DO PERFIL */}
                        <div className="perfil-heading">
                            <div className="perfil-heading-icon">
                                <PersonRoundedIcon />
                            </div>

                            <div>
                                <h2>Meu perfil</h2>
                                <p>
                                    Gerencie suas informações pessoais
                                    e preferências de acesso.
                                </p>
                            </div>
                        </div>

                        {/* FOTO */}
                        <section className="perfil-photo-section">

                            <Avatar
                                src={chosenImage || perfil}
                                alt={`Foto de ${usuario.nome}`}
                                className="perfil-avatar"
                            />

                            <div className="perfil-photo-info">
                                <h3>Foto de perfil</h3>
                                <p>
                                    Escolha uma imagem para representar
                                    sua conta.
                                </p>

                                <ImageUploaderModal
                                    setFile={setFile}
                                    setImage={setImage}
                                />
                            </div>

                        </section>

                        {/* INFORMAÇÕES */}
                        <section className="perfil-fields">

                            <div className="perfil-section-title">
                                <h3>Informações da conta</h3>
                            </div>

                            <div className="perfil-field">
                                <label htmlFor="inputNome">
                                    Nome completo
                                </label>

                                <div className="perfil-input-wrapper">
                                    <PersonRoundedIcon />

                                    <input
                                        type="text"
                                        id="inputNome"
                                        className="form-control"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Digite seu nome"
                                        maxLength={100}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="perfil-field">
                                <label htmlFor="inputEmail">
                                    E-mail
                                </label>

                                <div className="perfil-input-wrapper">
                                    <EmailRoundedIcon />

                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        readOnly
                                        value={usuario.email || ""}
                                    />
                                </div>
                            </div>

                            <div className="perfil-fields-grid">

                                <div className="perfil-field">
                                    <label htmlFor="inputNivel">
                                        Nível de acesso
                                    </label>

                                    <div className="perfil-input-wrapper">
                                        <VerifiedUserRoundedIcon />

                                        <input
                                            type="text"
                                            id="inputNivel"
                                            className="form-control"
                                            readOnly
                                            value={usuario.nivelAcesso || ""}
                                        />
                                    </div>
                                </div>

                                <div className="perfil-field">
                                    <label htmlFor="inputStatus">
                                        Status da conta
                                    </label>

                                    <div className="perfil-input-wrapper">
                                        <InfoRoundedIcon />

                                        <input
                                            type="text"
                                            id="inputStatus"
                                            className="form-control"
                                            readOnly
                                            value={usuario.statusUsuario || ""}
                                        />
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* AÇÕES */}
                        <section className="perfil-actions">

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={
                                    saving
                                        ? <CircularProgress size={18} color="inherit" />
                                        : <SaveRoundedIcon />
                                }
                                disabled={saving}
                                className="perfil-save-button"
                            >
                                {saving ? "Salvando..." : "Gravar alterações"}
                            </Button>

                            <Button
                                type="button"
                                variant="outlined"
                                color="inherit"
                                startIcon={<LockResetRoundedIcon />}
                                onClick={goToAlterarSenha}
                                className="perfil-password-button"
                            >
                                Alterar senha
                            </Button>

                        </section>

                        {/* MENSAGEM */}
                        {message && (
                            <div
                                className={`perfil-message ${
                                    successful ? "success" : "error"
                                }`}
                                role="status"
                            >
                                {message}
                            </div>
                        )}

                        {/* TEMA */}
                        <div className="perfil-theme-section">
                            <span>Aparência do sistema</span>
                            <ThemeToggleButton />
                        </div>

                    </form>

                </main>
            </div>
        </div>
    );
};

export default UsuarioPerfil;
