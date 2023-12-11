//import { useAuth } from "../Context/useAuth";
import { Route, Routes } from "react-router-dom";

import {PrivadasRoutes, PublicasRoutes} from "./PrivadasRoutes";
//PUBLICAS PAGES
//import { PublicasRoutes } from "./PublicasRoutes"
//import HomePublico from "../pages/Publicas/PageHomePublico";
//import RegisterPublico from "../pages/Publicas/PageRegisterPublico";
//import LoginPublico from "../pages/Publicas/PageLoginPublico";


//PRIVATE PAGES
//import { PrivateRoutes } from "./PrivateRoutes"
import Home from "../pages/Home";
//import ProfilePrivado from "../pages/Privadas/PageProfilePrivado";
//import PageErrorPrivado from "../pages/Privadas/PageErrorPrivado";


//ERROR PAGE
import PageError from "../pages/PageError";



//PUBLICAS

//import Login from "../pages/Publicas/Login"
import '../pages/stylesGlobal.css';

import Login from "../pages/Login";
import Register from "../pages/Register";
import UserProfile from "../pages/Profile/UserProfile";
import NuevoPost from "../pages/NuevoPost";





const AppRoutes: React.FC = () => {


 // const { isAuth } = useAuth();


 //console.log("Aqui muestro si el usaurio se logueo en la variable isAuth",isAuth)

  return (
    <Routes>
      
        // Si el usuario está autenticado, renderiza la ruta privada
        <Route element={<PrivadasRoutes />}> 
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/nuevo-post" element={<NuevoPost />} />
          <Route path="*" element={<PageError />} />
        </>
       </Route>

       <Route element={<PublicasRoutes />}> 
        <>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageError />} />
          </>
       </Route>
   

    </Routes>
  );
}

export default AppRoutes