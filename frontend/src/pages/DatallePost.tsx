import React, { useState, useEffect, useReducer } from 'react';
import postsHomeDatos from "../Types/TodosLosPorst"
import { potsHomePublic } from "../api/auth"
import { Accordion, Button, Card, Col, Container, ListGroup, Toast, Image, Row } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import NavBar from '../components/Navbar/NavBar';
import FooterHome from '../components/Footer/FooterHome';
import { useAuth } from '../Context/useAuth';
import { Link } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Facebook, Instagram } from 'react-bootstrap-icons';
import { FaXTwitter } from 'react-icons/fa6';



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

const DetallePost: React.FC = () => {
    const { user, isAuth, idUser } = useAuth();
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
               
                const userPosts = response.data.filter(post => post.author._id === idUser);
                setData(userPosts);
                //console.log('Respuesta de potsHomePubasdfasdflic:', response);
            } catch (error) {
                console.error('Error al cargar datos:', error);

            }
        };

        fetchData();
    }, [idUser]);

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
            <Container fluid className="d-flex align-items-center justify-content-center mt-5">
                <Row>
                    <Col className='w-140 position-relative'>
                        <Image
                            src={user?.avatarURL}
                            alt="Foto de perfil"
                            width="140"
                            height="140"
                            roundedCircle
                        />

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

            </Container>

           <div className="container mt-3">
          


                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-12">
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
                                                                        <img style={{ height: '34px', width: '34px' }} src={comment.author.avatarURL} className="rounded me-2 rounded-circle" alt="" />

                                                                        <strong className="me-auto">{comment.author.username}</strong>
                                                                        <span>{

                                                                            formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })


                                                                        }</span>
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
                                                                            <img style={{ height: '34px', width: '34px' }} src={user.avatarURL} className="rounded me-2 rounded-circle" alt="" />
                                                                            <strong className="me-auto">{user.username}</strong>
                                                                            <span>{

                                                                                formatDistanceToNow(new Date(), { addSuffix: true, locale: es })


                                                                            }</span>
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
                                                        Debes de estar Registrado, Inicia Sesion <Link to={"/login"}><span style={{ textDecoration: 'none', color: '#84B6F4' }}>Aqui
                                                        </span>
                                                        </Link> para Comentar.
                                                    </Accordion.Body>

                                                </>
                                            )}




                                        </Accordion.Item>
                                    </Accordion>
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

export default DetallePost;




