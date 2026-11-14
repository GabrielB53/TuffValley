
import { useState } from "react";
import { Link } from "react-router-dom";

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

import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import "./NewUser.css";

const initialFormData = {
    nome: "",
    email: "",
    senha: ""
};

const NewUser = () => {
    const [formData, setFormData] = useState(initialFormData);

    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setMessage("");

        setFieldErrors((previous) => ({
            ...previous,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const errors = {
            nome: "",
            email: "",
            senha: ""
        };

        if (!formData.nome.trim()) {
            errors.nome = "Informe seu nome.";
        }

        if (!formData.email.trim()) {
            errors.email = "Informe seu e-mail.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ) {
            errors.email = "Digite um e-mail válido.";
        }

        if (!formData.senha) {
            errors.senha = "Informe uma senha.";
        }

        setFieldErrors(errors);

        return !Object.values(errors).some(Boolean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            const response = await UsuarioService.create({
                nome: formData.nome.trim(),
                email: formData.email.trim(),
                senha: formData.senha,

                // Cadastros públicos nunca criam administradores.
                nivelAcesso: "USER",
                statusUsuario: "ATIVO"
            });

            setMessage(
                response.data?.message ||
                "Sua conta foi criada com sucesso!"
            );

            setSuccessful(true);
            setFormData(initialFormData);
            setFieldErrors({
                nome: "",
                email: "",
                senha: ""
            });

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);

            setMessage(
                error.response?.data?.message ||
                "Não foi possível criar sua conta. Verifique os dados e tente novamente."
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box className="newuser-page">

            <Container maxWidth="sm" className="newuser-container">

                <Paper elevation={0} className="newuser-card">

                    {/* Cabeçalho */}
                    <Box className="newuser-header">

                        <Avatar className="newuser-avatar">
                            <PersonAddAlt1RoundedIcon />
                        </Avatar>

                        <Typography className="newuser-brand">
                            TUFFVALLEY
                        </Typography>

                        <Typography
                            component="h1"
                            className="newuser-title"
                        >
                            {successful
                                ? "Bem-vindo à TuffValley!"
                                : "Comece a cultivar novas experiências"}
                        </Typography>

                        <Typography className="newuser-description">
                            {successful
                                ? "Sua conta foi criada. Agora você pode acessar a plataforma."
                                : "Crie sua conta e descubra novas possibilidades."}
                        </Typography>

                    </Box>

                    {/* Cadastro */}
                    {!successful && (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            className="newuser-form"
                            noValidate
                        >

                            {/* Nome */}
                            <Box className="newuser-field-group">

                                <Typography className="newuser-field-label">
                                    Nome completo
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    name="nome"
                                    placeholder="Como podemos chamar você?"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    error={Boolean(fieldErrors.nome)}
                                    helperText={fieldErrors.nome}
                                    className="newuser-field"
                                />

                            </Box>

                            {/* E-mail */}
                            <Box className="newuser-field-group">

                                <Typography className="newuser-field-label">
                                    E-mail
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="seuemail@exemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    error={Boolean(fieldErrors.email)}
                                    helperText={fieldErrors.email}
                                    className="newuser-field"
                                />

                            </Box>

                            {/* Senha */}
                            <Box className="newuser-field-group">

                                <Typography className="newuser-field-label">
                                    Senha
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    name="senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    placeholder="Crie sua senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    error={Boolean(fieldErrors.senha)}
                                    helperText={
                                        fieldErrors.senha ||
                                        "Escolha uma senha segura."
                                    }
                                    className="newuser-field"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setMostrarSenha(
                                                                !mostrarSenha
                                                            )
                                                        }
                                                        edge="end"
                                                        aria-label={
                                                            mostrarSenha
                                                                ? "Ocultar senha"
                                                                : "Mostrar senha"
                                                        }
                                                    >
                                                        {mostrarSenha
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

                            {/* Mensagem */}
                            {message && (
                                <Alert
                                    severity="error"
                                    className="newuser-feedback"
                                >
                                    {message}
                                </Alert>
                            )}

                            {/* Botão */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={submitting}
                                startIcon={
                                    submitting
                                        ? <CircularProgress size={19} color="inherit" />
                                        : <PersonAddAlt1RoundedIcon />
                                }
                                className="newuser-submit"
                            >
                                {submitting
                                    ? "Criando sua conta..."
                                    : "Criar minha conta"}
                            </Button>

                            {/* Login */}
                            <Box className="newuser-login-wrapper">

                                <Typography>
                                    Já possui uma conta?
                                </Typography>

                                <Link
                                    to="/login"
                                    className="newuser-login-link"
                                >
                                    Entrar
                                </Link>

                            </Box>

                        </Box>
                    )}

                    {/* Cadastro concluído */}
                    {successful && (
                        <Box className="newuser-success">

                            <Avatar className="newuser-success-avatar">
                                <CheckCircleRoundedIcon />
                            </Avatar>

                            <Alert
                                severity="success"
                                className="newuser-success-alert"
                            >
                                {message}
                            </Alert>

                            <Button
                                component={Link}
                                to="/login"
                                fullWidth
                                variant="contained"
                                className="newuser-submit"
                            >
                                Acessar minha conta
                            </Button>

                        </Box>
                    )}

                    {/* Rodapé */}
                    <Box className="newuser-footer">

                        <Link to="/" className="newuser-back-link">
                            <ArrowBackRoundedIcon fontSize="small" />
                            Voltar para a página inicial
                        </Link>

                        <Typography>
                            Cultivando conexões, experiências e possibilidades.
                        </Typography>

                    </Box>

                </Paper>

            </Container>

        </Box>
    );
};

export default NewUser;
