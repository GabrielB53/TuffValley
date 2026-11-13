import { Routes, Route } from "react-router-dom"
import App from "../templates/App/App"
import Home from "../templates/Home/Home"

import ForgotPass from "../templates/Login/ForgotPass"
import Login from "../templates/Login/Login"

import Mensagem from "../templates/Mensagem/Mensagem"
import MensagemLer from "../templates/Mensagem/MensagemLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import Grafico from "../templates/Graph/Grafico"
import AddCardapio from "../templates/Cardapio/AddCardapio"
import AlterarCardapio from "../templates/Cardapio/AlterarCardapio"
import Cardapio from "../templates/Cardapio/Cardapio"
import { ThemeProvider } from "../contexts/ThemeContext"
import CardapioLista from "../templates/Cardapio/CardapioLista"
import MensagemLista from "../templates/Mensagem/MensagemLista"
import LoginNewPass from "../templates/Login/LoginNewPass"
import UsuarioPerfil from "../templates/Usuario/UsuarioPerfil"
import UsuarioAlterarSenha from "../templates/Usuario/UsuarioAlterarSenha"
import RotaProtegida from "./Acesso/RotaProtegida"
import SendMessage from "../templates/Mensagem/SendMessage"
import AddCategoria from "../templates/Cardapio/AddCategoria"
import AddPrato from "../templates/Cardapio/AddPratos"
import AddProduto from "../templates/Cardapio/AddProdutos"
import AlterarPrato from "../templates/Cardapio/AlterarPrato"
import PratoLista from "../templates/Cardapio/Pratos"
import NewUser from "../templates/Login/NewUser"
import Planos from "../templates/App/Planos"
const AppRoutes = () => {
  return (
    <ThemeProvider>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/newpass/:id" element={<LoginNewPass />}></Route>
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/forgotpass" element={<ForgotPass />} />

          <Route path="/mensagem" element={<Mensagem />} />
          <Route path="/mensagemler/:id" element={<MensagemLer />} />
          <Route path="/mensagemlista" element={<MensagemLista />} />
          <Route path="/sendmessage" element={<SendMessage />} />


          <Route path="/usuario" element={<Usuario />} />
          <Route path="/usuarioperfil/:id" element={<UsuarioPerfil />} />
          <Route path="/usuarioalterarsenha/:id" element={<UsuarioAlterarSenha />} />
          <Route path="/usuarioslista" element={<UsuariosLista />} />
          <Route path="/usuarionovo" element={<UsuarioNovo />} />
          <Route path="/usuarioeditar/:id" element={<UsuarioEditar />} />

          <Route path="/grafico" element={<Grafico />} />

          <Route path="/addcardapio" element={<AddCardapio />} />
          <Route path="/addcategoria" element={< AddCategoria />} />
          <Route path="/addprato" element={< AddPrato />} />
          <Route path="/addproduto" element={< AddProduto />} />
          <Route path="/alterarprato/:id" element={< AlterarPrato />} />
          <Route path="/alterarcardapio/:id" element={<AlterarCardapio />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/cardapiolista" element={<CardapioLista />} />
          <Route path="/pratolista" element={<PratoLista />} />
        </Routes>

      </div>
    </ThemeProvider>
  )
}
export default AppRoutes