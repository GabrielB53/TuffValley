
import { Routes, Route } from "react-router-dom";

import App from "../templates/App/App";
import Home from "../templates/Home/Home";

import ForgotPass from "../templates/Login/ForgotPass";
import Login from "../templates/Login/Login";
import LoginNewPass from "../templates/Login/LoginNewPass";
import NewUser from "../templates/Login/NewUser";

import RotaProtegida from "./Acesso/RotaProtegida";

import Mensagem from "../templates/Mensagem/Mensagem";
import MensagemLer from "../templates/Mensagem/MensagemLer";
import MensagemLista from "../templates/Mensagem/MensagemLista";
import SendMessage from "../templates/Mensagem/SendMessage";

import Usuario from "../templates/Usuario/Usuario";
import UsuarioEditar from "../templates/Usuario/UsuarioEditar";
import UsuarioNovo from "../templates/Usuario/UsuarioNovo";
import UsuariosLista from "../templates/Usuario/UsuariosLista";
import UsuarioPerfil from "../templates/Usuario/UsuarioPerfil";
import UsuarioAlterarSenha from "../templates/Usuario/UsuarioAlterarSenha";

import Grafico from "../templates/Graph/Grafico";
import Planos from "../templates/App/Planos";

import { ThemeProvider } from "../contexts/ThemeContext";

const AppRoutes = () => {
    return (
        <ThemeProvider>
            <Routes>

                {/* =====================================
                    ROTAS PÚBLICAS
                ===================================== */}

                <Route path="/" element={<App />} />
                <Route path="/planos" element={<Planos />} />

                <Route path="/login" element={<Login />} />
                <Route path="/newuser" element={<NewUser />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
                <Route path="/newpass/:id" element={<LoginNewPass />} />


                {/* =====================================
                    ROTAS PARA USUÁRIOS AUTENTICADOS
                    ADMIN e USER
                ===================================== */}

                <Route
                    path="/home"
                    element={
                        <RotaProtegida>
                            <Home />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/usuario"
                    element={
                        <RotaProtegida>
                            <Usuario />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/usuarioperfil/:id"
                    element={
                        <RotaProtegida>
                            <UsuarioPerfil />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/usuarioalterarsenha/:id"
                    element={
                        <RotaProtegida>
                            <UsuarioAlterarSenha />
                        </RotaProtegida>
                    }
                />


                {/* =====================================
                    ROTAS EXCLUSIVAS PARA ADMINISTRADORES
                ===================================== */}

                <Route
                    path="/mensagem"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <Mensagem />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/mensagemler/:id"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <MensagemLer />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/mensagemlista"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <MensagemLista />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/sendmessage"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <SendMessage />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/usuarioslista"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <UsuariosLista />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/usuarionovo"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <UsuarioNovo />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/usuarioeditar/:id"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <UsuarioEditar />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/grafico"
                    element={
                        <RotaProtegida nivelAcesso="ADMIN">
                            <Grafico />
                        </RotaProtegida>
                    }
                />

            </Routes>
        </ThemeProvider>
    );
};

export default AppRoutes;
