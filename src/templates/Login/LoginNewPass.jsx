
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import UsuarioService from "../../services/UsuarioService";

import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import "./LoginNewPass.css";

const LoginNewPass = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [usuario, setUsuario] = useState({ email: "" });

    const [formData, setFormData] = useState({
        senha: "",
        newpass: ""
    });

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Busca os dados do usuário
    useEffect(() => {
        let active = true;

        if (!id) {
            setLoadError(true);
            setLoading(false);
            return;
        }

        UsuarioService.findById(id)
            .then((response) => {
                if (active) {
                    setUsuario(response.data);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar usuário:", error);

                if (active) {
                    setLoadError(true);
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, [id]);

    // Atualiza os campos
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setMessage("");
    };

    // Validação da confirmação
    const passwordsDoNotMatch =
        formData.newpass.length > 0 &&
        formData.senha !== formData.newpass;

    // Envio da nova senha
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!formData.senha || !formData.newpass) {
            setMessage("Preencha os dois campos de senha.");
            return;
        }

        if (formData.senha !== formData.newpass) {
            setMessage("As senhas não conferem.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await UsuarioService.alterarSenha(id, {
                senha: formData.senha
            });

            setMessage(
                response.data?.message ||
                "Sua senha foi alterada com sucesso!"
            );

            setSuccessful(true);
            setFormData({ senha: "", newpass: "" });

        } catch (error) {
            console.error("Erro ao alterar senha:", error);

            const errorMessage =
                error.response?.data?.message ||
                "Não foi possível alterar sua senha. Tente novamente.";

            setMessage(errorMessage);
            setSuccessful(false);

        } finally {
            setIsSubmitting(false);
        }
    };

    // Carregamento inicial
    if (loading) {
        return (
            <Box className="newpass-page newpass-loading">
                <CircularProgress />
                <Typography>Carregando seus dados...</Typography>
            </Box>
        );
    }

    return (
        <Box className="newpass-page">
            <Container maxWidth="sm" className="newpass-container">

                <Paper elevation={0} className="newpass-card">

                    {/* Cabeçalho */}
                    <Box className="newpass-header">

                        <Avatar className="newpass-avatar">
                            <LockResetRoundedIcon />
                        </Avatar>

                        <Typography className="newpass-brand">
                            TUFFVALLEY
                        </Typography>

                        <Typography
                            component="h1"
                            className="newpass-title"
                        >
                            {successful
                                ? "Tudo certo!"
                                : "Defina sua nova senha"}
                        </Typography>

                        <Typography className="newpass-description">
                            {successful
                                ? "Sua conta está pronta para continuar."
                                : "Um novo começo também merece uma nova senha."}
                        </Typography>

                    </Box>

                    {/* Erro ao carregar usuário */}
                    {loadError && (
                        <Box className="newpass-feedback">

                            <Alert severity="error">
                                Não foi possível carregar os dados da sua
                                conta. Verifique o acesso e tente novamente.
                            </Alert>

                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                fullWidth
                                className="newpass-submit"
                            >
                                Voltar para o login
                            </Button>

                        </Box>
                    )}

                    {/* Formulário */}
                    {!loadError && !successful && (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            className="newpass-form"
                            noValidate
                        >

                            <Alert
                                severity="warning"
                                className="newpass-warning"
                            >
                                Para continuar utilizando o sistema, é
                                necessário atualizar sua senha.
                            </Alert>

                            {/* E-mail */}
                            <Box className="newpass-field-group">
                                <Typography className="newpass-field-label">
                                    Conta vinculada
                                </Typography>

                                <TextField
                                    fullWidth
                                    name="email"
                                    value={usuario.email || ""}
                                    placeholder="Seu e-mail"
                                    disabled={!usuario.email}
                                    slotProps={{
                                        input: {
                                            readOnly: true
                                        }
                                    }}
                                    className="newpass-field"
                                />
                            </Box>

                            {/* Nova senha */}
                            <Box className="newpass-field-group">
                                <Typography className="newpass-field-label">
                                    Nova senha
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    name="senha"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="Digite sua nova senha"
                                    autoComplete="new-password"
                                    className="newpass-field"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        edge="end"
                                                        aria-label={
                                                            showPassword
                                                                ? "Ocultar senha"
                                                                : "Mostrar senha"
                                                        }
                                                    >
                                                        {showPassword
                                                            ? <VisibilityOffRoundedIcon />
                                                            : <VisibilityRoundedIcon />
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                />
                            </Box>

                            {/* Confirmação */}
                            <Box className="newpass-field-group">
                                <Typography className="newpass-field-label">
                                    Confirmar nova senha
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    name="newpass"
                                    type={
                                        showConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.newpass}
                                    onChange={handleChange}
                                    placeholder="Digite novamente sua senha"
                                    autoComplete="new-password"
                                    error={passwordsDoNotMatch}
                                    helperText={
                                        passwordsDoNotMatch
                                            ? "As senhas não conferem."
                                            : "Repita a senha para confirmar."
                                    }
                                    className="newpass-field"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowConfirmation(
                                                                !showConfirmation
                                                            )
                                                        }
                                                        edge="end"
                                                        aria-label={
                                                            showConfirmation
                                                                ? "Ocultar confirmação"
                                                                : "Mostrar confirmação"
                                                        }
                                                    >
                                                        {showConfirmation
                                                            ? <VisibilityOffRoundedIcon />
                                                            : <VisibilityRoundedIcon />
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                />
                            </Box>

                            {/* Mensagem de erro */}
                            {message && (
                                <Alert
                                    severity="error"
                                    className="newpass-feedback-alert"
                                >
                                    {message}
                                </Alert>
                            )}

                            {/* Ações */}
                            <Box className="newpass-actions">

                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBackRoundedIcon />}
                                    onClick={() => navigate("/")}
                                    disabled={isSubmitting}
                                    className="newpass-cancel"
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={
                                        !formData.senha ||
                                        !formData.newpass ||
                                        passwordsDoNotMatch ||
                                        isSubmitting
                                    }
                                    className="newpass-submit"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <CircularProgress
                                                size={19}
                                                color="inherit"
                                                sx={{ mr: 1 }}
                                            />
                                            Salvando...
                                        </>
                                    ) : (
                                        "Alterar senha"
                                    )}
                                </Button>

                            </Box>

                        </Box>
                    )}

                    {/* Sucesso */}
                    {successful && (
                        <Box className="newpass-success">

                            <Avatar className="newpass-success-avatar">
                                <CheckCircleRoundedIcon />
                            </Avatar>

                            <Alert
                                severity="success"
                                className="newpass-success-alert"
                            >
                                {message}
                            </Alert>

                            <Button
                                component={Link}
                                to="/home"
                                variant="contained"
                                fullWidth
                                className="newpass-submit"
                            >
                                Acessar o sistema
                            </Button>

                        </Box>
                    )}

                    {/* Rodapé */}
                    <Box className="newpass-footer">
                        <Typography>
                            Cultivando conexões, experiências e possibilidades.
                        </Typography>
                    </Box>

                </Paper>

            </Container>
        </Box>
    );
};

export default LoginNewPass;
