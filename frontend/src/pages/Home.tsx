import React, { useState, useEffect } from 'react';
import postsHomeDatos from "../Types/TodosLosPorst"
import { potsHomePublic } from "../api/auth"
import { Accordion, Button, Card, Form, ListGroup, Toast } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import NavBar from '../components/Navbar/NavBar';
import CarouselHome from '../components/CarouselHome/CarouselHome';
import FooterHome from '../components/Footer/FooterHome';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Home: React.FC = () => {
    const { isAuth, commentNuevo } = useAuth();

    const [data, setData] = useState<postsHomeDatos[]>();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = handleSubmit(async (data) => {
        console.log('entro en onSubmitdddd', data);
        try {
            const newComent = {
                description: data.descriptionComment
            };


            type SignupResult = boolean | void;

            const registroExitoso: SignupResult = await commentNuevo(newComent, data.post_id);

            if (typeof registroExitoso === 'boolean') {

                if (registroExitoso) {
                    console.log('Registro Exitoso valor del coment', registroExitoso);


                } else {

                    console.log('Registro fallido');
                }
            } else {

                console.log('La función comment new no devolvió un valor booleano');
            }
        } catch (error) {

            console.log(error);


        }
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<postsHomeDatos[]> = await potsHomePublic();
                setData(response.data);
                //console.log('Respuesta de potsHomePubasdfasdflic:', response);
            } catch (error) {
                console.error('Error al cargar datos:', error);

            }
        };

        fetchData();
    }, []);





    return (
        <>

            <NavBar />
            <CarouselHome />

            {isAuth ? (
                <>
                    <div>ESTE ES LA PARTE PRIVADO</div>


                </>
            ) : (
                <>

                    <div>ESTE ES LA PARTE PUBLICA</div>

                </>
            )}


            <div className="container mt-3">
                <section className="wid-menu-categories wid">
                    <article className="row">
                        <nav>
                            <ul className="d-flex justify-content-between flex-wrap" style={{ listStyle: 'none' }}>
                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_argentina.png"
                                                alt="Paquetes Argentina"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_argentina.png"
                                            />
                                            <p className="mt-2">Argentina</p>
                                        </div>
                                    </a>
                                </li>
                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_brasil.png"
                                                alt="Paquetes Brasil"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_brasil.png"
                                            />
                                            <p className="mt-2">Brasil</p>
                                        </div>
                                    </a>
                                </li>
                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_brasil.png"
                                                alt="Paquetes Brasil"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_caribe.png"
                                            />
                                            <p className="mt-2">Caribe</p>
                                        </div>
                                    </a>
                                </li>

                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_brasil.png"
                                                alt="Paquetes Brasil"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_centro_norteamerica.png"
                                            />
                                            <p className="mt-2">Centro y Norteamérica</p>
                                        </div>
                                    </a>
                                </li>

                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_brasil.png"
                                                alt="Paquetes Brasil"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_europa.png"
                                            />
                                            <p className="mt-2">Europa</p>
                                        </div>
                                    </a>
                                </li>

                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_brasil.png"
                                                alt="Paquetes Brasil"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_mundo.png"
                                            />
                                            <p className="mt-2">Resto del Mundo</p>
                                        </div>
                                    </a>
                                </li>

                                <li className="mr-3 flex-grow-1">
                                    <a href="#" className="category-name" style={{ textDecoration: 'none' }}>
                                        <div className="d-flex flex-column align-items-center">
                                            <img
                                                data-src="/assets/images/A/VIA/icons/retina/ico_brasil.png"
                                                alt="Paquetes Brasil"
                                                width="98"
                                                height="69"
                                                className=""
                                                src="imagenes/ico_sudamerica2.png"
                                            />
                                            <p className="mt-2">Sudamérica</p>
                                        </div>
                                    </a>
                                </li>
                                {/* Repite el mismo patrón para los demás elementos */}
                            </ul>
                        </nav>
                    </article>
                </section>


                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            {data && data.map((post, i) => (
                                <div key={i}>
                                    {/* Contenido de la columna del 60% */}

                                    <Card className="container-fluid mt-2" style={{ backgroundColor: '#181A1B', color: '#fff' }}>
                                        <Card.Img className='mt-3' variant="top" style={{ minHeight: '200px', maxHeight: '100px', objectFit: 'cover' }}
                                            src={post.imageURL} />
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <Card.Text>{post.description}</Card.Text>

                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item style={{ backgroundColor: '#181A1B', color: '#fff' }}>{
                                                new Date(post.createdAt).toLocaleDateString('es-AR', { weekday: "long", year: "numeric", month: "short", day: "numeric" })

                                            }</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Link href="#">Leer más...</Card.Link>
                                        </Card.Body>
                                    </Card>

                                    <Accordion defaultActiveKey="1" className="mt-3">


                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header >Comentarios</Accordion.Header>
                                            {isAuth ? (
                                                <>

                                                    <Accordion.Body style={{ backgroundColor: '#434344', color: '#fff' }}>
                                                        {/***************************************************************************************************/}

                                                        <Form>
                                                            <Form.Group className="mb-3 mt-4" controlId="formBasicdescription">
                                                                <Form.Label>Ingrese un comentario</Form.Label>

                                                                <Form.Control type="text"
                                                                    {...register("descriptionComment", { value: 'https://img.icons8.com/?size=192&id=kDoeg22e5jUY&format=png' })}
                                                                    autoComplete="descriptionComment"
                                                                    isInvalid={!!errors.descriptionComment}
                                                                />


                                                            </Form.Group>



                                                            <Form.Text className="text-muted">
                                                                We'll never share your email with anyone else.
                                                            </Form.Text>
                                                            <Form.Group className="mb-3" controlId="formBasicIdPost">
                                                                <Form.Control type='hidden' value={post._id}
                                                                    {...register("post_id")}
                                                                    autoComplete="post_id"
                                                                    isInvalid={!!errors.post_id}
                                                                />
                                                            </Form.Group>





                                                            <Button type="submit" variant="primary" onClick={onSubmit}>
                                                                Aceptar
                                                            </Button>
                                                        </Form>


                                                        {/***************************************************************************************************/}
                                                        {data && data.map((post, i) => (
                                                            <div key={i}>

                                                                {post && post.comments.map((comment, e) => (
                                                                    <div key={e} className=''>
                                                                        <Toast style={{ width: 'auto', backgroundColor: '#181A1B', color: '#fff' }} className="container-fluid">
                                                                            <Toast.Header style={{ width: 'auto', backgroundColor: '#353439', color: '#fff' }}>
                                                                                <img style={{ height: '34px', width: '34px' }} src={comment.author.avatarURL} className="rounded me-2" alt="" />
                                                                                <strong className="me-auto">{comment.author.username}</strong>
                                                                                <span>11 mins ago</span>
                                                                            </Toast.Header>
                                                                            <Toast.Body style={{ width: 'auto' }}>{comment.description}</Toast.Body>
                                                                        </Toast>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </Accordion.Body>




                                                </>
                                            ) : (
                                                <>

                                                    <Accordion.Body style={{ backgroundColor: '#434344', color: '#fff' }}>
                                                        Debes De Estar Registrado,<Link to={"/login"}><span style={{ textDecoration: 'none', color: '#84B6F4' }}>Inicia Sesion Aqui
                                                        </span>
                                                        </Link> Para Comentar.
                                                    </Accordion.Body>

                                                </>
                                            )}




                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            ))}
                        </div>


                        <div className="col-12 col-md-4 mt-0" >
                            {/* Contenido de la columna del 40% */}
                            {data && data.map((post, i) => (
                                <div key={i}>
                                    <Card className="container-fluid mt-2" style={{ backgroundColor: '#191B1C', color: '#fff' }}>
                                        <Card.Header className="mt-2" style={{ backgroundColor: '#26292A', color: '#fff' }}>{
                                            new Date(post.createdAt).toLocaleDateString('es-AR', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
                                        }</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <Card.Text>{post.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <FooterHome />
        </>
    );
};

export default Home;




