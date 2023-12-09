import NavBar from "../components/Navbar/NavBar";
import FooterHome from "../components/Footer/FooterHome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Person } from "react-bootstrap-icons";
import { useAuth } from "../Context/useAuth";


const PageError = () => {
  const { isAuth } = useAuth();


  //{isAuth && ( )}
  return (
    <>
      <NavBar />
      <div className="container d-flex justify-content-center align-items-center mt-5 h-auto">
        <div className="row">

          <div className="col-md-6 text-center">
            <img
              src="/imagenes/error.svg"
              alt="404"
              className="img-fluid mx-auto"
            />
          </div>


          <div className="col-md-6 text-center d-flex flex-column justify-content-center align-items-center">
            <h1 className="mt-4 display-3">Página no encontrada</h1>
            <p className="mt-4">Lo sentimos, la página que estás buscando no existe.</p>

            {!isAuth && (
              <>
                <Link to="/login">
                  <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none mt-3'
                    style={{ cursor: 'pointer', height: '10px' }} size="sm">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Person size={20} />
                      <span style={{ marginLeft: '5px', fontSize: '14px' }}>Iniciar sesión</span>
                    </div>
                  </Button>
                </Link>

                <div className="d-flex flex-column align-items-center mt-3">
                  <span>
                    Si no tenes cuenta <Link to="/register" className="mt-3"><span style={{ textDecoration: 'none', color: '#84B6F4' }}>Registrate</span></Link>
                  </span>
                </div>
              </>
            )}


            {isAuth && (
              <>
                <p>Puedes regresar a la{' '}
                  <span style={{ textDecoration: 'none', color: '#84B6F4' }}>página de inicio</span>
                </p>
              </>
            )}

          </div>
        </div>
      </div>

      <FooterHome />
    </>
  )
}

export default PageError