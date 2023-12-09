import { useContext } from "react";
import { UserContext } from "./AuthContext";

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Error en el contexto del usuario");
    return context;
};
