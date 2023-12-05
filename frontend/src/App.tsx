import UserProvider from "./components/Context/AuthContext";
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const App = () => {

  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </>
  )
}

export default App