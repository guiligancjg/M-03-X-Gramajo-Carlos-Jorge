import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap"
import { Person } from "react-bootstrap-icons"
import Image from 'react-bootstrap/Image'




const NavBar = () => {



  return (
    <>
      <Navbar id="detalle-section" expand="lg" className="bg-body-tertiary">
        <Container>
          <Nav.Link>
            <Image src={"imagenes/logo.png"} alt="Gramajo Carlos Jorge - EPICA" />
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link> Inicio </Nav.Link>



              <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none'
                style={{ cursor: 'pointer', height: '10px' }} variant="primary" size="sm">
                <Nav.Link style={{ textDecoration: 'none' }}>
                  Agregar tarea
                </Nav.Link>
              </Button>

              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              {  /*  <button onClick={()=>
              setUser?.setUser({
                username: "Jorge",
                email: "guiligan7@gmail.com",
                password: "RIKjac20",
                avatarURL: "",
              })
              }>Login</button>*/}

          

            </Nav>


            <Nav className="d-none d-md-flex">

              <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none mt-1'
                style={{ cursor: 'pointer', height: '10px' }} variant="outline-primary" size="sm">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Person size={20} />
                <span style={{ marginLeft: '5px', fontSize: '14px' }}>Iniciar sesión</span>
              </div>
              </Button>


              <Nav.Link style={{ textDecoration: 'none' }} >
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

export default NavBar