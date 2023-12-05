import CarouselHome from "../../components/CarouselHome/CarouselHome"
import FooterHome from "../../components/Footer/FooterHome"
import PostHomePrivado from "./PostHomePrivado"
import NavBarPrivado from "../../components/Navbar/NavBarPrivado";

const HomePublico = () => {
  return (
    <>
        <NavBarPrivado />
        <CarouselHome />
        <PostHomePrivado />
        <FooterHome />
    </>
  )
}

export default HomePublico