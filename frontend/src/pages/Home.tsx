import React, { useState, useEffect, useReducer } from 'react';
import postsHomeDatos from "../Types/TodosLosPorst"
import { potsHomePublic } from "../api/auth"
import { Accordion, Button, Card, ListGroup, Toast } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import NavBar from '../components/Navbar/NavBar';
import CarouselHome from '../components/CarouselHome/CarouselHome';
import FooterHome from '../components/Footer/FooterHome';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';



/***********************************************************************************************/
interface Comment {
    id: number;
    text: string;
}

type Action =
    | { type: 'ADD_COMMENT'; payload: { postId: string; comment: Comment } };

interface State {
    comments: { [postId: string]: Comment[] };
}

const initialState: State = {
    comments: {},
};

const reducer = (state: State, action: Action): State => {
    const { postId, comment } = action.payload;

    switch (action.type) {
        case 'ADD_COMMENT':
            
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [postId]: state.comments[postId] ? [...state.comments[postId], comment] : [comment],
                },
            };
        default:
            return state;
    }
};
/***********************************************************************************************/

const Home: React.FC = () => {
    const { user, isAuth } = useAuth();
    const [data, setData] = useState<postsHomeDatos[]>();

    /***********************************************************************************************/
    const { commentNuevo } = useAuth();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [newComments, setNewComments] = React.useState<{ [postId: string]: string }>({});
    const [errorMessage, setErrorMessage] = React.useState<string>('');


    /***********************************************************************************************/


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

    /***********************************************************************************************/
    const handleInputChange = (postId: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComments({
            ...newComments,
            [postId]: e.target.value,
        });
    };

    const handleAddComment = async (postId: string) => {
        try {
            const commentText = newComments[postId];
            if (commentText && commentText.trim() !== '') {
                const newCommentObj: Comment = {
                    id: state.comments[postId] ? state.comments[postId].length + 1 : 1,
                    text: commentText,
                };

                dispatch({
                    type: 'ADD_COMMENT',
                    payload: { postId, comment: newCommentObj },
                });

                // Llama a la función para agregar el comentario con el ID del usuario
                const registroExitoso = await commentNuevo(commentText, postId);

                console.log('Registro Exitoso valor del comentario', registroExitoso);
                setNewComments({
                    ...newComments,
                    [postId]: '',
                });
                setErrorMessage('');
            } else {
                setErrorMessage('El comentario no puede estar vacío.');
            }
        } catch (error) {
            console.log('Error al crear el comentario', error);
            setErrorMessage('Error al crear el comentario.');
        }
    };

    /***********************************************************************************************/



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
                            {data && data.map((post) => (

                                <div key={post._id}>
                                    { /* Contenido de la columna del 60% */}

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

                                    <Accordion defaultActiveKey={post._id} className="mt-3">


                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header >Comentarios</Accordion.Header>
                                            {isAuth ? (
                                                <>

                                                    <Accordion.Body key={post._id} style={{ backgroundColor: '#434344', color: '#fff' }}>
                                                        {/***************************************************************************************************/}

                                                        {post && post.comments.map((comment, e) => (
                                                            <div key={e} className=''>
                                                                <Toast style={{ width: 'auto', backgroundColor: '#181A1B', color: '#fff' }} className="container-fluid mt-3">
                                                                    <Toast.Header className='mt-2' style={{ width: 'auto', backgroundColor: '#353439', color: '#fff' }}>
                                                                        <img style={{ height: '34px', width: '34px' }} src={comment.author.avatarURL} className="rounded me-2" alt="" />
                                                                        <strong className="me-auto">{comment.author.username}</strong>
                                                                        <span>11 mins ago</span>
                                                                    </Toast.Header>
                                                                    <Toast.Body style={{ width: 'auto' }}>{comment.description}</Toast.Body>
                                                                </Toast>
                                                            </div>
                                                        ))}
                                                        {/***************************************************************************************************/}



                                                        <ul>
                                                            {state.comments[post._id] && state.comments[post._id].map((comment) => (
                                                                <div key={comment.id} className=''>
                                                                    <Toast style={{ width: 'auto', backgroundColor: '#181A1B', color: '#fff' }} className="container-fluid mt-3">
                                                                        <Toast.Header className='mt-2' style={{ width: 'auto', backgroundColor: '#353439', color: '#fff' }}>
                                                                            <img style={{ height: '34px', width: '34px' }} src={user.avatarURL} className="rounded me-2" alt="" />
                                                                            <strong className="me-auto">{user.username}</strong>
                                                                            <span>11 mins ago</span>
                                                                        </Toast.Header>
                                                                        <Toast.Body style={{ width: 'auto' }}>{comment.text}</Toast.Body>
                                                                    </Toast>
                                                                </div>
                                                            ))}
                                                        </ul>

                                                        <div id={post._id}>
                                                            <textarea
                                                                id={post._id}
                                                                rows={4}
                                                                value={newComments[post._id] || ''}  // Usar newComments[post._id] para el valor
                                                                onChange={(e) => handleInputChange(post._id, e)}  // Pasar el postId al manejador de cambio
                                                                placeholder="Agregar comentario"
                                                                className="form-control mt-5"
                                                            />
                                                            <div className='h-1'>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>

                                                            <div className="d-flex justify-content-end mt-5">
                                                                <Button onClick={() => handleAddComment(post._id)} variant="primary" type="submit">
                                                                    Agregar Comentario
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </Accordion.Body>
                                                </>
                                            ) : (
                                                <>

                                                    <Accordion.Body style={{ backgroundColor: '#434344', color: '#fff' }}>
                                                        Debes De Estar Registrado, Inicia Sesion <Link to={"/login"}><span style={{ textDecoration: 'none', color: '#84B6F4' }}>Aqui
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




