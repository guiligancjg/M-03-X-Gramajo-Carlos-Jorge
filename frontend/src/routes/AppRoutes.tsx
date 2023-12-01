import Home from "../pages/Home"
import { Route, Routes } from "react-router-dom"
import TareaNoEncontrada from "../pages/TareaNoEncontrada"
import Login from "../pages/Login"
import IngresarPostsUSer from "../pages/IngresarPostsUSer"
import '../pages/stylesGlobal.css';
import Register from "../pages/Register"
import Prueba from "../pages/Prueba"
import UserProfile from "../pages/UserProfile"
import { PrivateRoutes } from "./PrivateRoutes"




const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* PAGINA POR DEFECTO */}
      <Route path="*" Component={Home} />



      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<UserProfile />} />
  
      </Route>


      <Route path="/prueba" element={<Prueba />} />
      <Route path="/detalle/" element={<TareaNoEncontrada />} />
      <Route path="/ingresarPost/" element={<IngresarPostsUSer />} />


    </Routes>
  )
}

export default AppRoutes