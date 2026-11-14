
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UsuarioService from "../../services/UsuarioService";
import { useUser } from "../../contexts/UserContext";

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

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useUser();

    const [formData, setFormData] = useState({
        email: "",
        senha: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        if (!formData.email.trim() || !formData.senha) {
            setErrorMessage("Preencha seu e-mail e sua senha.");
            return;
        }

        setSubmitting(true);

        try {
            const user = await UsuarioService.signin(
                formData.email.trim(),
                formData.senha
            );

            if (!user) {
                setErrorMessage("Usuário ou senha inválidos.");
                return;
            }

            if (user.statusUsuario === "ATIVO") {
                setCurrentUser(user);
                navigate("/home");
                return;
            }

            if (user.statusUsuario === "TROCAR_SENHA") {
                setCurrentUser(user);
                navigate(`/newpass/${user.id}`);
                return;
            }

            setCurrentUser(null);
            setErrorMessage(
                "Sua conta não está disponível para acesso. Entre em contato com um administrador."
            );

        } catch (error) {
            console.error("Erro ao realizar login:", error);

            const respMessage =
                error.response?.data?.message ||
                "Não foi possível realizar o login. Verifique suas credenciais.";

            setErrorMessage(respMessage);

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box className="login-page">

            <Container maxWidth="sm" className="login-container">

                <Paper elevation={0} className="login-card">

                    {/* Cabeçalho */}
                    <Box className="login-header">

                        <Avatar className="login-avatar">
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography className="login-brand">
                            TUFFVALLEY
                        </Typography>

                        <Typography
                            component="h1"
                            className="login-title"
                        >
                            Bem-vindo de volta!
                        </Typography>

                        <Typography className="login-description">
                            Entre na sua conta e continue explorando
                            novas possibilidades.
                        </Typography>

                    </Box>

                    {/* Formulário */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="login-form"
                        noValidate
                    >

                        {/* E-mail */}
                        <Box className="login-field-group">

                            <Typography className="login-field-label">
                                E-mail
                            </Typography>

                            <TextField
                                fullWidth
                                required
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                className="login-field"
                            />

                        </Box>

                        {/* Senha */}
                        <Box className="login-field-group">

                            <Box className="login-password-heading">
                                <Typography className="login-field-label">
                                    Senha
                                </Typography>

                                <Link
                                    to="/forgotpass"
                                    className="login-forgot-link"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </Box>

                            <TextField
                                fullWidth
                                required
                                id="senha"
                                name="senha"
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={formData.senha}
                                onChange={handleChange}
                                autoComplete="current-password"
                                className="login-field"
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

                        {/* Erro */}
                        {errorMessage && (
                            <Alert
                                severity="error"
                                className="login-error"
                            >
                                {errorMessage}
                            </Alert>
                        )}

                        {/* Entrar */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={
                                submitting ||
                                !formData.email.trim() ||
                                !formData.senha
                            }
                            startIcon={
                                submitting
                                    ? <CircularProgress size={19} color="inherit" />
                                    : <LoginRoundedIcon />
                            }
                            className="login-submit"
                        >
                            {submitting ? "Entrando..." : "Entrar"}
                        </Button>

                        {/* Voltar */}
                        <Box className="login-back-wrapper">

                            <Link to="/" className="login-back-link">
                                <ArrowBackRoundedIcon fontSize="small" />
                                Voltar para a página inicial
                            </Link>

                        </Box>

                    </Box>

                    {/* Rodapé */}
                    <Box className="login-footer">
                        <Typography>
                            Cultivando conexões, experiências e possibilidades.
                        </Typography>
                    </Box>

                </Paper>

            </Container>

        </Box>
    );
};

export default Login;
