import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    Box,
    Container,
    Avatar,
    Typography,
    TextField,
    Button,
    Alert,
    IconButton,
    InputAdornment
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import UsuarioService from "../../services/UsuarioService";

const NewUser = () => {

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        nivelAcesso: "USER"
    });

    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        if (!formData.nome.trim() || !formData.email.trim() || !formData.senha) {
            setMessage("Preencha todos os campos.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await UsuarioService.create({
                ...formData,
                nivelAcesso: "USER"
            });

            setMessage(
                response.data?.message || "Usuário cadastrado com sucesso!"
            );

            setSuccessful(true);

            setFormData({
                nome: "",
                email: "",
                senha: "",
                nivelAcesso: "USER"
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Erro ao cadastrar usuário."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">

            <Box className="caixota" sx={{ mt: 8 }}>

                <form onSubmit={handleSubmit} autoComplete="off">

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 3
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                            <PersonAddAlt1Icon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Criar usuário
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Preencha os dados para cadastrar um novo usuário.
                        </Typography>
                    </Box>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nome"
                        name="nome"
                        autoComplete="name"
                        value={formData.nome}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        name="senha"
                        type={mostrarSenha ? "text" : "password"}
                        autoComplete="new-password"
                        value={formData.senha}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setMostrarSenha(!mostrarSenha)
                                            }
                                            edge="end"
                                            aria-label="Mostrar ou ocultar senha"
                                        >
                                            {mostrarSenha
                                                ? <VisibilityOff />
                                                : <Visibility />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    {message && (
                        <Alert
                            severity={successful ? "success" : "error"}
                            sx={{ mt: 2 }}
                        >
                            {message}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting}
                    >
                        {submitting ? "Cadastrando..." : "Cadastrar usuário"}
                    </Button>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Link to="/login">
                            Voltar para o login
                        </Link>
                    </Box>

                </form>
            </Box>

        </Container>
    );
};

export default NewUser;