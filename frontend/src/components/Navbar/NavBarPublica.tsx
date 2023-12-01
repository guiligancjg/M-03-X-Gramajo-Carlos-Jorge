import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom"


const NavBarPublica = () => {


  return (
    <>
      <Navbar id="detalle-section" expand="lg" className="bg-body-tertiary">
        <Container>
          <Nav.Link as={Link} to="/">
            <Image src={"imagenes/logo.png"} alt="Gramajo Carlos Jorge - EPICA" />
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">





            </Nav>


            <Nav className="d-none d-md-flex">

              <Link to="/login">
                <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none mt-1'
                  style={{ cursor: 'pointer', height: '10px' }} variant="outline-primary" size="sm">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Person size={20} />
                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>Iniciar sesión</span>
                  </div>
                </Button>
              </Link>

              <Nav.Link as={Link} to="/register" style={{ textDecoration: 'none' }}>
                Registrarse

              </Nav.Link>

            </Nav>


            <div className="d-md-none">
              <ul className="navbar-nav me-auto-mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link" href="#ticket">Ticket</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#perfil">Perfil</a>
                </li>

              </ul>

            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default NavBarPublica