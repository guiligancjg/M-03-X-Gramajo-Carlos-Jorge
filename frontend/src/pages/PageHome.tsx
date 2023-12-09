import CarouselHome from "../components/CarouselHome/CarouselHome"
import FooterHome from "../components/Footer/FooterHome"
import NavBar from "../components/Navbar/NavBar";



//RUTAS PRIVADAS
import PostHomePrivado from "./Privadas/PostHomePrivado"

//RUTAS PUBLICAS
import PostHomePublico from "./Publicas/PostHomePublico"


import { useAuth } from "../Context/useAuth";

const Home = () => {

  const { isAuth } = useAuth();

  return (

    isAuth ? (
      <>
        <NavBar />
        <CarouselHome />
        <PostHomePrivado />
        <FooterHome />
      </>
    ) : (
      <>
        <NavBar />
        <CarouselHome />
        <PostHomePublico />
        <FooterHome />
      </>
    )
    
  )
}

export default Home