import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";
import UsuarioService from "../../services/UsuarioService";

import "./Usuario.css";

const UsuarioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        id: null,
        nome: "",
        email: "",
        nivelAcesso: "",
        dataCadastro: "",
        statusUsuario: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState("");
    const [alerta, setAlerta] = useState({
        show: false,
        message: "",
        type: "info"
    });

    useEffect(() => {
        let ativo = true;

        const buscarUsuario = async () => {
            setLoading(true);

            try {
                const response = await UsuarioService.findById(id);

                if (ativo) {
                    setUsuario({
                        id: response.data?.id ?? null,
                        nome: response.data?.nome ?? "",
                        email: response.data?.email ?? "",
                        nivelAcesso: response.data?.nivelAcesso ?? "",
                        dataCadastro: response.data?.dataCadastro ?? "",
                        statusUsuario: response.data?.statusUsuario ?? ""
                    });
                }
            } catch (error) {
                if (ativo) {
                    setAlerta({
                        show: true,
                        message: "Não foi possível carregar os dados deste usuário.",
                        type: "error"
                    });
                }
            } finally {
                if (ativo) setLoading(false);
            }
        };

        buscarUsuario();

        return () => {
            ativo = false;
        };
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUsuario((anterior) => ({
            ...anterior,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!usuario.nome.trim() || !usuario.email.trim() || !usuario.nivelAcesso) {
            setAlerta({
                show: true,
                message: "Preencha nome, e-mail e nível de acesso.",
                type: "warning"
            });
            return;
        }

        setSaving(true);
        setAlerta({ show: false, message: "", type: "info" });

        try {
            await UsuarioService.update(id, {
                ...usuario,
                nome: usuario.nome.trim(),
                email: usuario.email.trim()
            });

            setAlerta({
                show: true,
                message: "Usuário atualizado com sucesso!",
                type: "success"
            });

            window.setTimeout(() => navigate("/usuarioslista"), 1200);
        } catch (error) {
            setAlerta({
                show: true,
                message: "Erro ao atualizar usuário. Verifique os dados e tente novamente.",
                type: "error"
            });
        } finally {
            setSaving(false);
        }
    };

    const executarAcao = async (acao, mensagemSucesso, mensagemErro) => {
        setActionLoading(acao);
        setAlerta({ show: false, message: "", type: "info" });

        try {
            if (acao === "inativar") await UsuarioService.inativar(id);
            if (acao === "reativar") await UsuarioService.reativar(id);
            if (acao === "senha") await UsuarioService.resetarSenha(id);

            setAlerta({
                show: true,
                message: mensagemSucesso,
                type: "success"
            });

            window.setTimeout(() => navigate("/usuarioslista"), 1200);
        } catch (error) {
            setAlerta({
                show: true,
                message: mensagemErro,
                type: "error"
            });
        } finally {
            setActionLoading("");
        }
    };

    const formatarData = (data) => {
        if (!data) return "—";

        const dataConvertida = new Date(data);

        if (Number.isNaN(dataConvertida.getTime())) return data;

        return dataConvertida.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const ocupado = loading || saving || Boolean(actionLoading);

    return (
        <div className="usuario-editar-layout">
            <Sidebar />

            <main className="usuario-editar-main">
                <Header
                    goto="/usuarioslista"
                    title="Editar usuário"
                    logo={logo}
                />

                <section className="usuario-editar-container">
                    <div className="usuario-editar-heading">
                        <div>
                            <span className="usuario-editar-eyebrow">
                                GERENCIAMENTO
                            </span>
                            <Typography component="h1" className="usuario-editar-title">
                                Editar usuário
                            </Typography>
                            <Typography className="usuario-editar-subtitle">
                                Consulte e atualize as informações da conta.
                            </Typography>
                        </div>

                        <Button
                            className="usuario-editar-back"
                            variant="outlined"
                            startIcon={<ArrowBackRoundedIcon />}
                            onClick={() => navigate("/usuarioslista")}
                        >
                            Voltar
                        </Button>
                    </div>

                    {alerta.show && (
                        <Alert
                            className="usuario-editar-alert"
                            severity={alerta.type}
                            onClose={() =>
                                setAlerta({ show: false, message: "", type: "info" })
                            }
                        >
                            {alerta.message}
                        </Alert>
                    )}

                    <Paper className="usuario-editar-card" elevation={0}>
                        {loading ? (
                            <div className="usuario-editar-loading">
                                <CircularProgress />
                                <Typography>Carregando dados do usuário...</Typography>
                            </div>
                        ) : usuario.id ? (
                            <Box component="form" onSubmit={handleSubmit}>
                                <div className="usuario-editar-card-heading">
                                    <div>
                                        <Typography component="h2">
                                            Informações da conta
                                        </Typography>
                                        <Typography>
                                            Os campos de identificação são somente para consulta.
                                        </Typography>
                                    </div>

                                    <span className="usuario-editar-id">
                                        ID #{usuario.id}
                                    </span>
                                </div>

                                <Grid container spacing={2.5}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Nome"
                                            name="nome"
                                            value={usuario.nome}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="usuario-editar-field"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="E-mail"
                                            name="email"
                                            type="email"
                                            value={usuario.email}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="usuario-editar-field"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="ID do usuário"
                                            value={usuario.id}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                            className="usuario-editar-field usuario-editar-readonly"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Data de cadastro"
                                            value={formatarData(usuario.dataCadastro)}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                            className="usuario-editar-field usuario-editar-readonly"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Status"
                                            value={usuario.statusUsuario || "—"}
                                            fullWidth
                                            InputProps={{ readOnly: true }}
                                            className="usuario-editar-field usuario-editar-readonly"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className="usuario-editar-field">
                                            <InputLabel id="nivel-acesso-label">
                                                Nível de acesso
                                            </InputLabel>
                                            <Select
                                                labelId="nivel-acesso-label"
                                                name="nivelAcesso"
                                                value={usuario.nivelAcesso}
                                                onChange={handleChange}
                                                label="Nível de acesso"
                                                required
                                            >
                                                <MenuItem value="USER">Usuário padrão</MenuItem>
                                                <MenuItem value="ADMIN">Administrador</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className="usuario-editar-actions">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                startIcon={
                                                    saving
                                                        ? <CircularProgress size={17} color="inherit" />
                                                        : <SaveRoundedIcon />
                                                }
                                                disabled={ocupado}
                                                className="usuario-editar-save"
                                            >
                                                {saving ? "Salvando..." : "Salvar alterações"}
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>

                                <div className="usuario-editar-divider" />

                                <div className="usuario-editar-card-heading usuario-editar-security-heading">
                                    <div>
                                        <Typography component="h2">
                                            Ações da conta
                                        </Typography>
                                        <Typography>
                                            Essas ações alteram o acesso do usuário ao sistema.
                                        </Typography>
                                    </div>
                                </div>

                                <div className="usuario-editar-account-actions">
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        startIcon={<CheckCircleRoundedIcon />}
                                        disabled={ocupado}
                                        onClick={() =>
                                            executarAcao(
                                                "reativar",
                                                "Usuário reativado com sucesso!",
                                                "Erro ao reativar usuário."
                                            )
                                        }
                                    >
                                        {actionLoading === "reativar" ? "Reativando..." : "Reativar"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        startIcon={<LockResetRoundedIcon />}
                                        disabled={ocupado}
                                        onClick={() =>
                                            executarAcao(
                                                "senha",
                                                "Solicitação de redefinição de senha concluída!",
                                                "Erro ao resetar a senha."
                                            )
                                        }
                                    >
                                        {actionLoading === "senha" ? "Resetando..." : "Resetar senha"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<BlockRoundedIcon />}
                                        disabled={ocupado}
                                        onClick={() =>
                                            executarAcao(
                                                "inativar",
                                                "Usuário inativado com sucesso!",
                                                "Erro ao inativar usuário."
                                            )
                                        }
                                    >
                                        {actionLoading === "inativar" ? "Inativando..." : "Inativar"}
                                    </Button>
                                </div>
                            </Box>
                        ) : (
                            <div className="usuario-editar-empty">
                                <Typography component="h2">
                                    Usuário não encontrado
                                </Typography>
                                <Typography>
                                    Não foi possível localizar uma conta com esse identificador.
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/usuarioslista")}
                                >
                                    Voltar para a lista
                                </Button>
                            </div>
                        )}
                    </Paper>
                </section>
            </main>
        </div>
    );
};

export default UsuarioEditar;
