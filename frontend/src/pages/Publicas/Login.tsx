//import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useAuth } from "../../components/Context/useAuth"
import { useEffect, useState } from 'react';



const Login = () => {
  //    const { setUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { signin, isAuth, setIsAuth, errors: registerError } = useAuth();

  const [showError, setShowError] = useState(false);

  //Direccionar al Home en caso que el login sea exito!!!
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuth) {
      console.log("el calor en login de isAuth es:", isAuth)
    }

  }, [isAuth, navigate, setIsAuth]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        avatarURL: data.avatarURL
      };
      signin(newUser);
      setShowError(true);
      navigate("/home")
    } catch (error) {
      //console.error('Error en el registro:', error);
    }
  });

/* Mensaje de error del servidor  */
useEffect(() => {
  if (showError) {
    const timeoutId = setTimeout(() => {
      setShowError(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }
}, [showError]);

  return (
    <>

            <div className='h-20'>
                {showError && (
                    <div className="alert alert-danger w-100 text-center" role="alert">
                        <h2 className="alert-heading">Error</h2>
                        {registerError && registerError.map((error,i) => (
                            <div key={i}>{error}</div>
                        ))}
                    </div>
                )}
            </div>






      <div className='d-flex flex-column justify-content-start align-items-center'>
        <Form>
          <Form.Text className="text-muted">
            <h1 className="display-6 mt-5">Inicio</h1>
          </Form.Text>
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
              {...register("email", {required: true} )}
              autoComplete="email"
              isInvalid={!!errors.email}
            />
            {errors.email && <p>Ingrese el email</p>}

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              {...register("password", {required: true} )}
              autoComplete="current-password"
              isInvalid={!!errors.password}
            />
            {errors.password && <p>Ingrese un password</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicavatarURL">
            <input
              type="hidden"
              {...register('avatarURL', { value: '' })}
            />

          </Form.Group>


          <Button onClick={onSubmit} className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none mt-1'
            style={{ cursor: 'pointer', height: '10px' }} size="sm">
            <div style={{ display: 'flex', alignItems: 'center' }}>

              <span style={{ marginLeft: '5px', fontSize: '14px' }}>Iniciar sesión</span>
            </div>
          </Button>



        </Form>
        <div className='container' style={{ width: '20rem' }}>
          <div className='d-flex justify-between mt-10'>

            <span className='mt-2'>¿No tienes una Cuenta?</span>

            <Link to="/register" className="mt-2">
              <span style={{ textDecoration: 'none', color: '#ffffff' }}>Registrate</span>


            </Link>

          </div>
        </div>



      </div>

    </>
  )
}

export default Login