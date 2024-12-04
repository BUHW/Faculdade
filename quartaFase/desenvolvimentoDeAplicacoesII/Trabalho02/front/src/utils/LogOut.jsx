import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../components/auth/AuthContext";

export function useLogout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return () => {
        logout();
        navigate('/login');
    }
}
