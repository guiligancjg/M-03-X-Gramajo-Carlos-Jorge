//import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
//import { registerReq } from '../api/auth';
import { useAuth } from "../components/Context/useAuth"
import { useEffect } from 'react';



const Register = () => {

    const { register, handleSubmit, formState: {errors}  } = useForm();

    const { signup, isAuth, errors: registerError } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const newUser = {
                username: data.username,
                email: data.email,
                password: data.password,
                avatarURL: data.avatarURL
            };
            signup(newUser);

        } catch (error) {
            console.error('Error en el registro:', error);
        }
    });

//Direccionar al Home en caso que el login sea exito!!!
const navigate = useNavigate();
useEffect(()=> {
    if(isAuth) { 
      navigate("/prueba");
    }

},[isAuth, navigate]);

    return (
        <>
            <div className='d-flex flex-column justify-content-start align-items-center'>
                <Form>
                    <Form.Text className="text-muted">
                        Registro
                    </Form.Text>
                    {registerError.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                    <Form.Group className="mb-3" controlId="formBasicUser">
                        <Form.Label>Nombre del Usuario</Form.Label>

                        <Form.Control type="text" placeholder="Ingrese el Usuario"
                            {...register("username")}
                            autoComplete="username"
                        />
                        {errors.username && (<p className='text-red-400'>Usuario requerido</p>)}




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
                            {...register('avatarURL', { value: 'https://img.icons8.com/?size=192&id=kDoeg22e5jUY&format=png' })}
                        />
                    </Form.Group>
                    <Button onClick={onSubmit} variant="primary" type="submit">
                       <span style={{color: 'blue'}} >Registrarme</span> 
                    </Button>

                </Form>
                <div className='container' style={{ width: '30rem' }}>
                    <div className='d-flex gap-2 justify-between mt-10'>

                        <span className='mt-1'>¿Tienes una Cuenta?</span>
                        <Link to="/login">
                            <Button className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none'
                                style={{ cursor: 'pointer', height: '10px' }} variant="outline-primary" size="sm">
                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>
                                        Iniciar sesión
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

export default Register

