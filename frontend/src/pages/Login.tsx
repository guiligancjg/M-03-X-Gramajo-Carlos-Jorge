//import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useAuth } from "../components/Context/useAuth"
import { useEffect } from 'react';



const Login = () => {
  //    const { setUser } = useContext(UserContext);

  const { register, handleSubmit} = useForm();

  const { signin, isAuth, errors: loginError } = useAuth();

//Direccionar al Home en caso que el login sea exito!!!
const navigate = useNavigate();
useEffect(()=> {
    if(isAuth) { 
      navigate("/profile");
    }

},[isAuth, navigate]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        avatarURL: data.avatarURL
      };
      signin(newUser);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  });



  return (
    <>
      <div className='d-flex flex-column justify-content-start align-items-center'>
        <Form>
          <Form.Text className="text-muted">
            Inicio
          </Form.Text>
          {loginError.map((error, index) => (
              <div key={index}>{error}</div>
            ))}

          <Form.Group className="mb-3" controlId="formBasicUser">
            <input id="formBasicavatarURL"
              type="hidden"
              {...register('username', { value: '' })}
              autoComplete="username"
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
          
            <Form.Control type="email" placeholder="Ingrese el email"
              {...register("email")}
              autoComplete="email"
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              {...register("password")}
              autoComplete="current-password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicavatarURL">
            <input
              type="hidden"
              {...register('avatarURL', { value: '' })}
            />

          </Form.Group>


          <Button onClick={onSubmit} variant="primary" type="submit" style={{color: 'blue' }}>
            Iniciar Sesión
          </Button>

        </Form>
        <div className='container' style={{ width: '30rem' }}>
          <div className='d-flex gap-2 justify-between mt-10'>

            <span className='mt-1'>¿No tienes una Cuenta?</span>
            <Link to="/register">
              <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none'
                style={{ cursor: 'pointer', height: '10px' }} variant="outline-primary" size="sm">
                <div style={{ display: 'flex', alignItems: 'center' }}>

                  <span style={{ marginLeft: '5px', fontSize: '14px', color: 'blue' }}>
                    Registrarse
                  </span>
                </div>
              </Button>
            </Link>

          </div>
        </div>



      </div>

    </>
  )
}

export default Login