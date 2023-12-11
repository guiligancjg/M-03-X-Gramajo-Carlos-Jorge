import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Form, FormControl, Modal } from 'react-bootstrap';
import { Facebook, Instagram } from 'react-bootstrap-icons';
import { FaXTwitter } from "react-icons/fa6";



import User from '../../Types/Users';
import { datosUsers } from '../../api/auth';

import './cssProfile.css';
import NavBar from '../../components/Navbar/NavBar';
//import FooterHome from '../components/Footer/FooterHome';
import Footer from '../../components/Footer/Footer';

//import { useAuth } from '../Context/useAuth';

//import User from "../Types/Users"

const UserProfile: React.FC = () => {
  //const { profileUser } = useAuth();

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordFormToggle = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleUpdatePassword = () => {
    // Lógica para actualizar la contraseña
    alert('Contraseña actualizada con éxito');
  };

  const [user, setUser] = useState<User>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await datosUsers();
        setUser(response);
        console.log('Respuesta de potsHomePubasdfasdflic:', response);
      } catch (error) {
        console.error('Error al cargar datos:', error);

      }
    };

    fetchData();
  }, []);






  /******************************************************************** */

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = () => {
    // Aquí podrías realizar la lógica para eliminar la cuenta
    // Esto es solo un ejemplo, deberías adaptarlo según tu backend y requisitos
    console.log('Cuenta eliminada');

    // Luego, puedes llamar a la función onDelete para realizar otras acciones necesarias

    // Cierra el modal después de realizar la acción
    handleClose();
  };

  /******************************************************************* */
  return (


    <>
      <NavBar />


      {user && (
        <>
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
                {/* Otro contenido adicional según tus necesidades */}
              </Col>
            </Row>

          </Container>

          <Container fluid className="d-flex align-items-center justify-content-center mt-5 w-auto">
            <Form>

              <Form.Group as={Row} className="mb-4" controlId="formUser">
                <Form.Label column sm="3">
                  Usuario
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control type="text" placeholder={user.username} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formUser">
                <Form.Label column sm="3">
                  E-mail
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control type="email" placeholder={user.email} />
                </Col>
              </Form.Group>

            </Form>
          </Container>
        </>)}

      {/********************************************************************** */}
      <Container fluid className="d-flex align-items-center justify-content-center mt-5">
        <Button variant="primary" onClick={handlePasswordFormToggle}>
          {showPasswordForm ? 'Cancelar' : 'Modificar Contraseña'}
        </Button>
      </Container>
      <Container fluid className="d-flex align-items-center justify-content-center">

        <Row>
          {/* Formulario de Contraseña */}
          {showPasswordForm && (
            <Col>
              <Form className="my-3">


                <Row className="mb-3">
                  <Form.Group as={Col} controlId="newPassword1">
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <FormControl
                      type="password"
                      placeholder="Ingrese nueva contraseña"
                      // onChange={handleInputChange}
                      name="password"
                    />
                  </Form.Group>
                </Row>



                <Row className="mb-3">
                  <Form.Group as={Col} controlId="newPassword2">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <FormControl
                      type="password"
                      placeholder="Confirme la contraseña"
                      // onChange={handleInputChange}
                      name="confirmPassword"
                    />
                  </Form.Group>
                </Row>


                <Row>
                  <Col className="text-center">
                    <Button variant="primary" type="button" onClick={handleUpdatePassword}>
                      Guardar Cambios
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          )}

          {/* Botón "Modificar Contraseña" o "Cancelar" */}



        </Row>
      </Container>

      {/********************************************************************** */}

      <Container fluid className="d-flex align-items-center justify-content-center mt-5">
        <Button variant="danger" onClick={handleShow}>
          Eliminar Cuenta
        </Button>

        <Modal show={showModal} onHide={handleClose} className="modal-custom">
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>Eliminar Cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">
            <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
            <p>Esta acción es irreversible y eliminará permanentemente tu cuenta y todos tus datos asociados.</p>
          </Modal.Body>
          <Modal.Footer className="modal-footer-custom">
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Confirmar Eliminación
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>


      <Footer />
    </>
  );


};

export default UserProfile;
