import { useAuth } from "../components/Context/useAuth";
import { Outlet } from "react-router-dom";

export const PrivateRoutes = () => {

    const { isAuth } = useAuth();

    console.log(isAuth);
    if (isAuth) {
        console.log("entro en la parte privada en PrivateRoutes")
        return <Outlet />;

      
        
    } 
}

