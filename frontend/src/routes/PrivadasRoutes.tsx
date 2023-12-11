import { useAuth } from "../Context/useAuth";
import { Outlet} from "react-router-dom";

export const PrivadasRoutes = () => {

    const { isAuth } = useAuth();
    
    console.log("rutas privadas",isAuth);
    if (isAuth) {
        return <Outlet />;
    } else {
        return <PublicasRoutes />;
    }
}

export const PublicasRoutes = () => {
        return <Outlet />;

}