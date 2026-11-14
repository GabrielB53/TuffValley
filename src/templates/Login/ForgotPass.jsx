
import { Link } from "react-router-dom";

import {
    Box,
    Button,
    Container,
    Avatar,
    TextField,
    Typography
} from "@mui/material";

import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useFormik } from "formik";
import * as yup from "yup";

import "./ForgotPass.css";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Digite um endereço de e-mail válido")
        .required("O e-mail é obrigatório")
});

const ForgotPass = () => {

    const formik = useFormik({
        initialValues: {
            email: ""
        },

        validationSchema,

        onSubmit: (values) => {
            // Integrar aqui com o serviço de recuperação de senha.
            console.log("Solicitação de recuperação:", values.email);
        }
    });

    return (
        <main className="forgot-page">

            <Container maxWidth="sm" className="forgot-container">

                <Box className="forgot-card">

                    {/* IDENTIDADE VISUAL */}
                    <div className="forgot-brand">
                        <Avatar className="forgot-avatar">
                            <LockResetRoundedIcon />
                        </Avatar>

                        <span className="forgot-eyebrow">
                            TUFFVALLEY
                        </span>
                    </div>

                    {/* APRESENTAÇÃO */}
                    <div className="forgot-heading">

                        <Typography component="h1">
                            Recuperar senha
                        </Typography>

                        <Typography component="p">
                            Não se preocupe! Informe seu e-mail
                            para iniciar o processo de recuperação
                            da sua conta.
                        </Typography>

                    </div>

                    {/* FORMULÁRIO */}
                    <form
                        onSubmit={formik.handleSubmit}
                        className="forgot-form"
                    >

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Endereço de e-mail"
                            type="email"
                            placeholder="exemplo@email.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email &&
                                formik.errors.email
                            }
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={formik.isSubmitting}
                            className="forgot-submit"
                        >
                            Enviar instruções
                        </Button>

                    </form>

                    {/* VOLTAR */}
                    <Link to="/login" className="forgot-back">
                        <ArrowBackRoundedIcon fontSize="small" />
                        Voltar para o login
                    </Link>

                    <div className="forgot-footer">
                        <span>Conectando experiências.</span>
                    </div>

                </Box>

            </Container>

        </main>
    );
};

export default ForgotPass;
