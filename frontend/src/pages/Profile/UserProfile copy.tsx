import React, { FormEvent, useReducer, useState } from 'react';
import { Container, Row, Col, Image, Button, Form, Modal } from 'react-bootstrap';
import { Facebook, Instagram } from 'react-bootstrap-icons';
import { FaXTwitter } from "react-icons/fa6";
import { actualizarFotoPerfil } from "../../api/auth"


import { FaPencilAlt } from 'react-icons/fa'; // Asegúrate de tener instalada la librería react-icons


//import mostrarUser from '../../Types/User';
//import { datosUsers } from '../../api/auth';

import './cssProfile.css';
import NavBar from '../../components/Navbar/NavBar';
//import FooterHome from '../components/Footer/FooterHome';
//import Footer from '../../components/Footer/Footer';
import FooterHome from '../../components/Footer/FooterHome';
//import User from '../../Types/Users';
import { useAuth } from '../../Context/useAuth';
//import { useAuth } from '../../Context/useAuth';

//import { useAuth } from '../Context/useAuth';

//import User from "../Types/Users"

type ActionType = { type: 'SET_NEW_IMAGE'; payload: string } | { type: 'CLOSE_MODAL' } | { type: 'OPEN_MODAL' };

type ReducerState = {
  avatarURL: string;
  newImage: string;
  showModalCambiarImagen: boolean;
};


const reducer = (state: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    case 'SET_NEW_IMAGE':
      return { ...state, newImage: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, showModalCambiarImagen: false };
    case 'OPEN_MODAL':
      return { ...state, showModalCambiarImagen: true };
    default:
      return state;
  }
};

const UserProfile: React.FC = () => {

  const { user, setUser } = useAuth();

  /******************************************************************** */
 // const [user, setUser] = useState<User>();

/*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await datosUsers();
        setUser(response);
        console.log('Respuesta de potsHome:', response);
      } catch (error) {
        console.error('Error al cargar datos:', error);

      }
    };

    fetchData();
  }, []);

  */


  const [state, dispatch] = useReducer(reducer, {
    avatarURL: '',
    newImage: '',
    showModalCambiarImagen: false,
  });

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await actualizarFotoPerfil(state.newImage);
        dispatch({ type: 'SET_NEW_IMAGE', payload: response.avatarURL });
        console.log('Respuesta de datosUsers:', response);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);*/

  const handleOpenModal = () => {
    console.log("esto llega; ", state)
    dispatch({ type: 'SET_NEW_IMAGE', payload: state.avatarURL || '' });
    dispatch({ type: 'OPEN_MODAL' });
  };


  const handleImageChange = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Nueva imagen:', state.newImage);
    setUser({
      username: user.username, 
      avatarURL: state.newImage,
      email: user.email
  });
    console.log("y esto cambia la imgagen supuestamente ", state)
    try {
      // Lógica para enviar la nueva imagen al servidor
      console.log('Respuesta de actualizarFotoPerfil esto mando al servidor: ', state.newImage);
      const response = await actualizarFotoPerfil(state.newImage);
      console.log('Respuesta de actualizarFotoPerfil esto responde el servidor:', response);
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
    }

    
    dispatch({ type: 'CLOSE_MODAL' });
  };


  //const { user, showModalCambiarImagen } = state;
  /***************************PARA MOSTRAR VENTA CAMBIAR IMAGEN***************************************** */

  //const { profileUser } = useAuth();


  /******************************************************************** */

  /******************************************************************** */









  /***************************PARA MOSTRAR VENTA ELIMINAR CUENTA***************************************** */

  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleShow = () => setShowModalDelete(true);
  const handleClose = () => setShowModalDelete(false);


  const handleDelete = () => {
    // Lógica para eliminar la cuenta
    console.log('Cuenta eliminada');
    handleClose();
  };


  /***************************PARA MOSTRAR VENTA **********************GUARDADO EXITO DE LOS CAMPOS* */
  const [showModalGuardado, setShowModalGuardado] = useState(false);


  const handleGuardarCambios = () => {
    // Aquí puedes realizar las operaciones para guardar los cambios
    // Puedes agregar lógica adicional según tus necesidades

    // Muestra el modal después de guardar los cambios
    setShowModalGuardado(true);
  };


  const handleCloseModal = () => {
    // Cierra el modal y realiza acciones adicionales si es necesario
    setShowModalGuardado(false);
  };

  /******************************************************************* */
  return (


    <>
      <NavBar />




      {user && (
        <>
          <Container fluid className="d-flex align-items-center justify-content-center mt-5">
            <Row>
              <Col className='w-140 position-relative'>
                <Image src={
                  
                  user.avatarURL
                
                  

                  } alt="Foto de perfil" width="140" height="140" roundedCircle />
                <FaPencilAlt className="edit-icon" onClick={handleOpenModal} />
              </Col>
              <Col className="text-left pl-4 mt-4">
                <h2>{`Hola, ${user.username}!`}</h2>
                <div className="d-flex justify-content-start mt-3">
                  <a href="#!"><Facebook className="me-3" size={24} /></a>
                  <a href="#!"><FaXTwitter className="me-3" size={24} /></a>
                  <a href="#!"><Instagram size={24} /></a>
                </div>
                {/* Otro contenido adicional según tus necesidades */}
              </Col>
            </Row>

            <Modal show={state.showModalCambiarImagen} onHide={() => dispatch({ type: 'CLOSE_MODAL' })} centered>
              <Modal.Header closeButton className='modal-header-custom'>
                <Modal.Title>Cambiar Imagen de Perfil</Modal.Title>
              </Modal.Header>
              <Modal.Body className='modal-header-custom'>
                <Form onSubmit={handleImageChange}>
                  <Form.Group controlId="formNewImage">
                    <Form.Label>URL de la Nueva Imagen</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la URL de la nueva imagen"
                      value={state.newImage}
                      onChange={(e) => dispatch({ type: 'SET_NEW_IMAGE', payload: e.target.value })}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Cambiar Imagen
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer className='modal-header-custom'>
                <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                  Cancelar
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>




          <Container fluid className="d-flex align-items-center justify-content-center mt-5 w-auto">
            <Form>

              <Form.Group as={Row} className="mb-4" controlId="formUser1">
                <Form.Label column sm="3">
                  Usuario
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control type="text" placeholder={user.username} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formUser2">
                <Form.Label column sm="3">
                  E-mail
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control type="email" placeholder={user.email} />
                </Col>
              </Form.Group>


              <hr className="my-4 bg-light" />

              <Form.Group as={Row} className="mb-4" controlId="formUser3">
                <Form.Label column sm="3">
                  Nueva Contraseña
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control type="password" placeholder="*********" autoComplete='password' />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formUser4">
                <Form.Label column sm="3">
                  Confirmar Contraseña
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control type="password" placeholder="*********" autoComplete='password' />
                </Col>
              </Form.Group>





              <div className="d-flex justify-content-end mt-5">

                <Button variant="primary" type="button" onClick={handleGuardarCambios}>
                  Guardar Cambios
                </Button>

              </div>


              <div className='h-10'></div>

              <div className="d-flex justify-content-center mt-5">
                <Button variant="danger" onClick={handleShow}>
                  Eliminar Cuenta
                </Button>

              </div>
            </Form>
          </Container>
        </>)}

      <Modal show={showModalDelete} onHide={handleClose}>
        <Modal.Header closeButton className='modal-header-custom'>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-header-custom'>
          ¿Estás seguro de que deseas eliminar esta cuenta?
        </Modal.Body>
        <Modal.Footer className='modal-footer-custom'>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={showModalGuardado} onHide={handleCloseModal}>
        <Modal.Header closeButton className='modal-header-custom'>
          <Modal.Title>Mensaje de Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-header-custom'>
          Los datos fueron ingresados y guardados correctamente.
        </Modal.Body>
        <Modal.Footer className='modal-header-custom'>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>



      <div className='h-10'></div>
      <FooterHome />
    </>
  );


};

export default UserProfile;


/*
 <Container fluid className="d-flex align-items-center justify-content-center mt-5">
            <Row>
              <Col className='w-140'>
                <Image src={user.avatarURL} alt="Foto de perfil" width="140" height="140" roundedCircle />
              </Col>
              <Col className="text-left pl-4 mt-4">
                <h2>{`Hola, ${user.username}!`}</h2>
                <div className="d-flex justify-content-start mt-3">
                  <a href="#!"><Facebook className="me-3" size={24} /></a>
                  <a href="#!"><FaXTwitter className="me-3" size={24} /></a>
                  <a href="#!"><Instagram size={24} /></a>
                </div>
                
                </Col>
                </Row>
    
              </Container>
 */