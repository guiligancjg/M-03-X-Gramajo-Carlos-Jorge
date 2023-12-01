import { useAuth } from "../components/Context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {

    const { isAuth } = useAuth();

    console.log(isAuth);
    if (!isAuth) {
        return <Navigate to="/login" />
    } else {
        return <Outlet />;
    }
}

