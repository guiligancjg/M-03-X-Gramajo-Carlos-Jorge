import Footer from "./components/Footer/Footer"

import UserProvider from "./components/Context/AuthContext";
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CarouselHome from "./components/CarouselHome/CarouselHome";

import NavBarPublica from "./components/Navbar/NavBarPublica";


const App = () => {

  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Router>
          <NavBarPublica />
          <CarouselHome />
          <AppRoutes />
          <Footer />
        </Router>
      </UserProvider>
    </>
  )
}

export default App