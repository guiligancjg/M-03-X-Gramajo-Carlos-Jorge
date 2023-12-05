import CarouselHome from "../../components/CarouselHome/CarouselHome"
import FooterHome from "../../components/Footer/FooterHome"
import PostHomePublico from "./PostHomePublico"
import NavBarPublico from "../../components/Navbar/NavBarPublica";
const HomePublico = () => {
  return (
    <>
        <NavBarPublico />
        <CarouselHome />
        <PostHomePublico />
        <FooterHome />
    </>
  )
}

export default HomePublico