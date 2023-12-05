import { Route, Routes } from "react-router-dom"

//PUBLICAS
import { PublicasRoutes } from "./PublicasRoutes"
import Login from "../pages/Publicas/Login"
import '../pages/stylesGlobal.css';
import Register from "../pages/Publicas/Register"
import Footer from "../components/Footer/Footer"
import CarouselHome from "../components/CarouselHome/CarouselHome";
import NavBarPublico from "../components/Navbar/NavBarPublica";
import PostHomePublico from "../pages/Publicas/PostHomePublico"
import FooterHome from "../components/Footer/FooterHome"


//PRIVADAS
import { PrivateRoutes } from "./PrivateRoutes"
import UserProfile from "../pages/Privadas/UserProfile"
import PostHomePrivado from "../pages/Privadas/PostHomePrivado"
import NavBarPrivado from "../components/Navbar/NavBarPrivado";
import HomePublico from "../pages/Publicas/HomePublico";
import HomePrivado from "../pages/Privadas/HomePrivado";



const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route element={<PublicasRoutes />}>
        <Route path="/login" element={
          <div>
            <NavBarPublico />
            <Login />
            <Footer />
          </div>

        } />
        <Route path="/register" element={
          <div>
            <NavBarPublico />
            <Register />
            <Footer />
          </div>
        } />
        {/* PAGINA POR DEFECTO 
       
        */}
         
        <Route path="/" element={
          <div>
              <NavBarPublico />
              <CarouselHome />
              <PostHomePublico />
              <FooterHome />

          </div>
        
        } />


      <Route path="*" Component={HomePublico} />

      </Route>



      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={
          <div>
              <NavBarPrivado />
              <UserProfile />
              <FooterHome />
          </div>
          
          } />
        <Route path="/home" element={
          <div>
            <NavBarPrivado />
            <CarouselHome />
            <PostHomePrivado />
            <FooterHome />
          </div>
        } />

      <Route path="*" Component={HomePrivado} />
      </Route>






    </Routes>
  )
}

export default AppRoutes