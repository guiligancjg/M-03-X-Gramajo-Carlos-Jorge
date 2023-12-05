import { useAuth } from "../components/Context/useAuth";
import { Outlet } from "react-router-dom";

export const PublicasRoutes = () => {

    const { isAuth } = useAuth();

    console.log(isAuth);
    if (!isAuth) {
        console.log("entro en la parte publica en PublicasRoutes")
        return <Outlet />;

      
        
    } 
}

