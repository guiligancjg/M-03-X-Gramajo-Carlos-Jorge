import { Navbar, Container, Nav, Dropdown } from "react-bootstrap"
//import { Person } from "react-bootstrap-icons"
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom"
import { useAuth } from "../../Context/useAuth";
import { Person } from "react-bootstrap-icons";



const NavBar = () => {

  const { user, signout, isAuth } = useAuth();


  return (
    <>
      <Navbar id="detalle-section" expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <Image src={"imagenes/logo.png"} alt="Logo del sitio" style={{ height: '2rem', marginRight: '0.5rem' }} />
            <span style={{ marginBottom: '3px' }}>Rincon Viajero</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              {isAuth && (<Nav.Link as={Link} to="/destinos">Mis Destinos</Nav.Link>)}
              {/* Agrega más enlaces según la estructura de tu sitio */}
            </Nav>

            <Nav className="d-none d-md-flex gap-4">
              {/* Opciones de navegación para usuarios autenticados */}
              {isAuth && (
                <>
                  <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                  <Nav.Link as={Link} to="/nuevo-post">Nuevo Post</Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="d-flex align-items-center h-9">
                      <span style={{ textDecoration: 'none', color: '#ffffff' }}>{user.username}</span>
                      <img style={{ height: '2rem', marginLeft: '1rem' }} src={user.avatarURL} alt="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/nuevo-post">Nuevo Post</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/" onClick={() => signout()}>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

              {/* Opciones de navegación para usuarios no autenticados */}
              {!isAuth && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Person size={20} />
                    <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                  </div>
                </>
              )}
            </Nav>

           
            {isAuth && (
              <>
               <div className="d-lg-none">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/destinos">Perfil</Nav.Link>
                    <Nav.Link as={Link} to="/destinos">Nuevo Post</Nav.Link>
                    <Nav.Link as={Link} to="/destinos">Cerrar sesión</Nav.Link>
                  </Nav>
               </div>
              </>
            )}

          

            {!isAuth && (
              <>
              <div className="d-md-none">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Person size={20} />{' '}Iniciar Sesión
                    </div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/destinos">Registrarse</Nav.Link>
                </Nav>
                </div>
              </>
            )}
          

          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default NavBar