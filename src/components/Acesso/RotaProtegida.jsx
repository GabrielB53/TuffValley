import { useUser } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import AcessoNegado from "../../templates/Home/AcessoNegado";

const RotaProtegida = ({ children, nivelAcesso }) => {
    const { currentUser, isUserLoaded } = useUser();

    // Aguarda a recuperação dos dados do usuário
    if (!isUserLoaded) {
        return null;
    }

    // Usuário não autenticado: encaminha para o login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Verifica se o usuário possui o nível de acesso necessário
    if (nivelAcesso && currentUser.nivelAcesso !== nivelAcesso) {
        return <AcessoNegado />;
    }

    return children;
};

export default RotaProtegida;