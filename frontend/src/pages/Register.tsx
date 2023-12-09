//import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
//import { registerReq } from '../api/auth';
import { useAuth } from "../Context/useAuth"
import { useEffect, useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer/Footer';
//import { useEffect, useState } from 'react';



const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signup, errors: registerError } = useAuth();
    console.log("lo que entro registerError", registerError.length)
    const [showError, setShowError] = useState(false);
    const [exito, setExito] = useState(false);
    // setShowError(true)
    const navigate = useNavigate();
    //const mensaje = ;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const newUser = {
                username: data.username,
                email: data.email,
                password: data.password,
                avatarURL: data.avatarURL
            };
            
            type SignupResult = boolean | void;

            const registroExitoso: SignupResult = await signup(newUser);

            if (typeof registroExitoso === 'boolean') {

                if (registroExitoso) {
                    setShowError(false)
                    setExito(registroExitoso)
                    setTimeout(() => {
                        navigate("/login");
                      }, 2000);
                    

                } else {
                    setShowError(true)
                    console.log('Registro fallido');
                }
            } else {

                console.log('La función signup no devolvió un valor booleano');
            }
        } catch (error) {

            console.log(error);


        }
    });


    //Direccionar al Home en caso que el login sea exito!!!

    /*    useEffect(() => {
            if (isAuth) {
                console.log("entro porque isAuth es verdadero")
                
            }
    
        }, [isAuth, navigate, setIsAuth]);*/

    /* Mensaje de error del servidor  */
useEffect(() => {
        if (showError) {
          const timeoutId = setTimeout(() => {
            setShowError(false);
          }, 2000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [showError]);



    return (
        <>
        <NavBar />
            <div className='h-20'>
                {showError ? (
                    <div className="alert alert-danger w-100 text-center" role="alert">
                        <h2 className="alert-heading">Error</h2>
                        <div className="text-success">
                            {registerError.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    exito && (
                        <div className="alert alert-success w-100 text-center" role="alert">
                            <h2 className="alert-heading">¡Registro Exitoso!</h2>
                            <div className="text-success">Usuario registrado exitosamente.</div>
                        </div>
                    )
                )}

            </div>


            <div className='d-flex flex-column justify-content-start align-items-center'>
                <Form>
                    <Form.Text className="text-muted">
                        <h1 className="display-6 mt-5">Registro</h1>

                    </Form.Text>

                    <Form.Group className="mb-3 mt-4" controlId="formBasicUser">
                        <Form.Label>Nombre del Usuario</Form.Label>

                        <Form.Control type="text" placeholder="Ingrese el Usuario"
                            {...register("username", { required: true })}
                            autoComplete="username"
                            isInvalid={!!errors.username}
                        />
                        {errors.username && <p>Ingrese el nombre del Usuario</p>}

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>


                        <Form.Control type="email" placeholder="Ingrese el email"
                            {...register("email", { required: true })}
                            autoComplete="email"
                            isInvalid={!!errors.email}
                        />
                        {errors.email && <p>Ingrese el email</p>}

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            {...register("password", { required: true })}
                            autoComplete="current-password"
                            isInvalid={!!errors.password}
                        />
                        {errors.password && <p>Ingrese un password</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicavatarURL">
                        <input
                            type="hidden"
                            {...register('avatarURL', { value: 'https://img.icons8.com/?size=192&id=kDoeg22e5jUY&format=png' })}
                        />
                    </Form.Group>

                    <Button onClick={onSubmit} className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none mt-1'
                        style={{ cursor: 'pointer', height: '10px' }} size="sm">
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <span style={{ marginLeft: '5px', fontSize: '14px' }}>Registrarme</span>
                        </div>
                    </Button>

                </Form>
                <div className='container' style={{ width: '20rem' }}>
                    <div className='d-flex gap-2 justify-between mt-10'>

                        <span className='mt-2'>¿Tienes una Cuenta?</span>
                        <Link to="/login">

                            <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none mt-1'
                                style={{ cursor: 'pointer', height: '10px' }} size="sm">
                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>Iniciar sesión</span>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>



            </div>






            <Footer />
        </>
    )
}

export default Register

/*
 <div className='h-20'>
                {showError  ? (
                        <div className="alert alert-danger w-100 text-center" role="alert">
                            <h2 className="alert-heading">Error</h2>
                            <div className="text-success">
                            {registerError.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                            </div>
                        </div>
                        ) : (
                        
                            <div className="alert alert-success w-100 text-center" role="alert">
                            <h2 className="alert-heading">¡Registro Exitoso!</h2>
                            <div className="text-success">
                                {registerError.map((error, i) => (
                                <div key={i}>{error}</div>
                                ))}
                            </div>
                            </div>
                        
                        )}
                </div>


*/