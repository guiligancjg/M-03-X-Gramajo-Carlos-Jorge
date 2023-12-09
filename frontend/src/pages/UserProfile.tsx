import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { useAuth } from '../Context/useAuth';
//import User from "../Types/Users"

const UserProfile: React.FC = () => {
  const { userProfile } = useAuth();

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordFormToggle = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleUpdatePassword = () => {
    // Lógica para actualizar la contraseña
    alert('Contraseña actualizada con éxito');
  };



  return (
    <>
      {userProfile ? (
        <div>
          <h1>{`Hola, ${userProfile.username}!`}</h1>
          <p>{`Email: ${userProfile.email}`}</p>
          <p>{`Password: ${userProfile.password}`}</p>
          <p>{`avatarURL: ${userProfile.avatarURL}`}</p>

        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            {userProfile ? (
             <>
                <div className="text-center">
                  <Image
                    src={userProfile.avatarURL}
                    alt="Foto de perfil"
                    width="140"
                    height="140"
                    roundedCircle
                  />
                </div>
                <div className="text-center mt-2">


                  <h1>{`Hola, ${userProfile.username}!`}</h1>
                  <p>{`Email: ${userProfile.email}`}</p>
                  <p>{`Password: ${userProfile.password}`}</p>
                  <p>{`avatarURL: `}</p>


                </div>
                </>
                ) : (
                <p>Cargando datos del usuario...</p>
            )}
                <Button variant="primary" onClick={handlePasswordFormToggle}>
                  Modificar Contraseña
                </Button>

                {showPasswordForm && (
                  <Form className="mt-3">
                    <Form.Group controlId="newPassword">
                      <Form.Label>Nueva Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Ingrese nueva contraseña" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleUpdatePassword}>
                      Guardar Cambios
                    </Button>
                  </Form>
                )}
              </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
