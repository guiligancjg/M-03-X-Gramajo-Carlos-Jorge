import { Route, Routes } from "react-router-dom"


//PUBLICAS PAGES
//import { PublicasRoutes } from "./PublicasRoutes"
//import HomePublico from "../pages/Publicas/PageHomePublico";
//import RegisterPublico from "../pages/Publicas/PageRegisterPublico";
//import LoginPublico from "../pages/Publicas/PageLoginPublico";


//PRIVATE PAGES
//import { PrivateRoutes } from "./PrivateRoutes"
import Home from "../pages/PageHome";
import ProfilePrivado from "../pages/Privadas/PageProfilePrivado";
//import PageErrorPrivado from "../pages/Privadas/PageErrorPrivado";


//ERROR PAGE
import PageError from "../pages/PageError";



//PUBLICAS

//import Login from "../pages/Publicas/Login"
import '../pages/stylesGlobal.css';
import { useAuth } from "../Context/useAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";





const AppRoutes: React.FC = () => {


  const { isAuth } = useAuth();


  console.log("Aqui muestro si el usaurio se logueo en la variable isAuth",isAuth)

  return (
    <Routes>
      {(isAuth) ? (
        // Si el usuario está autenticado, renderiza la ruta privada
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePrivado />} />
          <Route path="*" element={<PageError />} />
        </>
      ) : ( 
        <>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageError />} />
        </>
       )}

    </Routes>
  );
}

export default AppRoutes