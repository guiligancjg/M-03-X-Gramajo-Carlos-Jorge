import React, { FormEvent, useState } from 'react';
import { Container, Row, Col, Image, Button, Form, Modal } from 'react-bootstrap';
import { Facebook, Instagram } from 'react-bootstrap-icons';
import { FaXTwitter } from "react-icons/fa6";
import { actualizarFotoPerfil, actualizarDatosUsuario, eliminarUsuario } from "../../api/auth"
import { FaEye, FaEyeSlash, FaPencilAlt } from 'react-icons/fa';
import './cssProfile.css';
import NavBar from '../../components/Navbar/NavBar';
import FooterHome from '../../components/Footer/FooterHome';
import { useAuth } from '../../Context/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {


  const navigate = useNavigate();
  
  const { signout } = useAuth();

  const [passwordError, setPasswordError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    } else {
      setPasswordError('');
    }
    setUser({
      username: username || user.username,
      avatarURL: user.avatarURL || '',
      email: email || user.email
    });

    try {

      const newDatos = {
        username: data.username,
        email: data.email,
        password: data.password,

      }

      const response = await actualizarDatosUsuario(newDatos);
      setShowModalGuardado(true);
      console.log('Respuesta de actualizarFotoPerfil esto responde el servidor:', response);
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
    }



    console.log("entro aqui")

  });


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useAuth();
  const [newImage, setNewImage] = useState<string>('');
  const [showModalCambiarImagen, setShowModalCambiarImagen] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalGuardado, setShowModalGuardado] = useState<boolean>(false);

  const handleOpenModal = () => {
    setNewImage('');
    setShowModalCambiarImagen(true);
  };

  const handleImageChange = async (e: FormEvent) => {
    e.preventDefault();
    setUser({
      username: user?.username || '',
      avatarURL: newImage,
      email: user?.email || ''
    });

    try {
      const response = await actualizarFotoPerfil(
        newImage
      );
      console.log('Respuesta de actualizarFotoPerfil esto responde el servidor:', response);
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
    }

    setShowModalCambiarImagen(false);
  };

  const handleShow = () => setShowModalDelete(true);
  const handleClose = () => setShowModalDelete(false);

  const handleDelete = async() => {
    try {
      const response = await eliminarUsuario();
      console.log('Usuario eliminado...', response);
      signout();
      navigate("/");
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
    }
    handleClose();
  };


  const handleCloseModal = () => {
    setShowModalGuardado(false);
  };




  return (
    <>
      <NavBar />
      {user && (
        <>
          <Container fluid className="d-flex align-items-center justify-content-center mt-5">
            <Row>
              <Col className='w-140 position-relative'>
                <Image
                  src={user.avatarURL}
                  alt="Foto de perfil"
                  width="140"
                  height="140"
                  roundedCircle
                />
                <div className="d-flex justify-content-end align-items-end">
                  <FaPencilAlt className="edit-icon" onClick={handleOpenModal} />
                </div>
              </Col>

              <Col className="text-left pl-4 mt-4">
                <h2>{`Hola, ${user.username}!`}</h2>
                <div className="d-flex justify-content-start mt-3">
                  <a href="#!">
                    <Facebook className="me-3" size={24} />
                  </a>
                  <a href="#!">
                    <FaXTwitter className="me-3" size={24} />
                  </a>
                  <a href="#!">
                    <Instagram size={24} />
                  </a>
                </div>
              </Col>
            </Row>
            <Modal
              show={showModalCambiarImagen}
              onHide={() => setShowModalCambiarImagen(false)}
              centered
            >
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
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Cambiar Imagen
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer className='modal-header-custom'>
                <Button
                  variant="secondary"
                  onClick={() => setShowModalCambiarImagen(false)}
                >
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
                  <Form.Control
                    type="text"
                    placeholder={user.username}
                    value={username}

                    {...register("username", { minLength: 6 })}
                    autoComplete="username"
                    isInvalid={!!errors.username}
                    onChange={(e) => setUsername(e.target.value)}

                  />

                </Col>
                <div className="d-flex justify-content-center">
                  {errors.username && errors.username.type === 'minLength' && (
                    <p>El nombre de usuario no puede tener menos de 6 caracteres</p>
                  )}
                </div>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formUser2">
                <Form.Label column sm="3">
                  E-mail
                </Form.Label>
                <Col sm="9" className="d-flex align-items-center justify-content-between">
                  <Form.Control
                    type="email"
                    placeholder={user.email}
                    value={email}
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Ingrese un correo electrónico válido',
                      },
                    })}
                    autoComplete="email"
                    isInvalid={!!errors.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                <div className="d-flex justify-content-center">
                  {errors.email && (
                    <p>Ingrese un correo electrónico válido</p>
                  )}
                </div>
              </Form.Group>


              <hr className="my-4 bg-light" />

              <Form.Group as={Row} className="mb-4" controlId="formUser3">
                <Form.Label column sm="3">
                  Nueva Contraseña
                </Form.Label>
                <Col sm="9" className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*********"
                    autoComplete='password'
                    value={password}
                    {...register("password", { minLength: 6 })}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute end-12 top-5 translate-middle-y cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <div className="d-flex justify-content-center">
                  {errors.password && errors.password.type === 'minLength' && (
                    <p>La Contraseña no debe tener menos de 6 caracteres</p>
                  )}
                </div>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formConfirmPassword">
                <Form.Label column sm="3">
                  Confirmar Contraseña
                </Form.Label>
                <Col sm="9" className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*********"
                    autoComplete='password'
                    value={confirmPassword}
                    {...register("confirmPassword", { minLength: 6 })}
                    isInvalid={!!errors.confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute end-12 top-5 translate-middle-y cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >

                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>

                </Col>
                <div className="d-flex justify-content-center">
                  {errors.confirmPassword && errors.confirmPassword.type === 'minLength' && (
                    <p>El nombre de usuario no puede tener menos de 6 caracteres</p>)}
                  {passwordError && <p>{passwordError}</p>}
                </div>

              </Form.Group>





              <div className="d-flex justify-content-end mt-5">

                <Button onClick={onSubmit} variant="primary" type="button">
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
        </>
      )}
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
