import React, { useReducer, useState, useEffect } from 'react';
import postsHomeDatos from "../Types/TodosLosPorst"
import { eliminarPost, potsHomePublic} from "../api/auth"
import { Card, Col, Container, Row, Image, Modal, Button } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import NavBar from '../components/Navbar/NavBar';
import FooterHome from '../components/Footer/FooterHome';
import { useAuth } from '../Context/useAuth';
import { Facebook, Instagram } from 'react-bootstrap-icons';
import { FaTrash, FaXTwitter } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type State = postsHomeDatos[];

type Action = { type: 'SET_POSTS'; payload: postsHomeDatos[] } | { type: 'DELETE_POST'; payload: string };


const postsReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_POSTS':
        return action.payload;
      case 'DELETE_POST':
        return state.filter((post) => post._id !== action.payload);
      default:
        return state;
    }
  };


/***********************************************************************************************/
type HandleShowType = (postId: string, showModal: boolean) => void;


const MisDestinos: React.FC = () => {
    const { user, idUser, unPost } = useAuth();
    const [state, dispatch] = useReducer(postsReducer, []);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [idPost, setIdPost] = useState<string>('');

    const navigate = useNavigate();

   // const [data, setData] = useState<postsHomeDatos[]>();

    const handleShow: HandleShowType = (postId, showModal) => {
        setIdPost(postId);
        setShowModalDelete(showModal);
      };

  //  const handleShow = () => setShowModalDelete(true);
    const handleClose = () => setShowModalDelete(false);


    const handleDelete = async () => {
        try {
            const response = await eliminarPost(idPost);
            dispatch({ type: 'DELETE_POST', payload: idPost });
            console.log('Usuario eliminado...', response);
        } catch (error) {
            console.error('Error al actualizar la foto de perfil:', error);
        }
        handleClose();
    };

    /***********************************************************************************************/



    /***********************************************************************************************/


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<postsHomeDatos[]> = await potsHomePublic();

                const userPosts = response.data.filter(post => post.author._id === idUser);
                dispatch({ type: 'SET_POSTS', payload: userPosts });

                //setData(userPosts);
                //console.log('Respuesta de potsHomePubasdfasdflic:', response);
            } catch (error) {
                console.error('Error al cargar datos:', error);

            }
        };

        fetchData();
    }, [idUser]);

    /***********************************************************************************************/



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

                    <div className="container-fluid mt-5 d-flex flex-row flex-wrap justify-content-center">

                        {state && state.map((post) => (

                            <Card key={post._id} style={{ width: '18rem', margin: '10px', backgroundColor: '#181A1B', color: '#fff' }}>

                                <Card.Img variant="top" src={post.imageURL} />
                                <Card.Body style={{height: '200px' }}>

                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>
                                        {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
                                    </Card.Text>
                                </Card.Body>

                                <Card.Body className="d-flex justify-content-between" style={{ backgroundColor: '#181A1B', color: '#fff', height: '56px' }}>
                                    <div className="d-flex align-items-center">
                                        <Card.Link href="#">Leer más...</Card.Link>
                                    </div>
                                    <div onClick={() => {unPost(post._id); navigate("/editar-destino")}} className="ms-auto" style={{ position: 'relative', top: '-7px', left: '50px', cursor: 'pointer' }}>
                                        <FaPencilAlt className="edit-icon" />
                                    </div>
                                    <div className="ms-auto" onClick={() => handleShow(post._id, true)} style={{cursor: 'pointer' }}>
                                        <FaTrash className="delete-icon" />
                                    </div>
                                </Card.Body>
                                


                            </Card>




                        ))}
                        <Modal show={showModalDelete} onHide={handleClose}>
                                    <Modal.Header closeButton className='modal-header-custom'>
                                        <Modal.Title>Confirmar eliminación</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='modal-header-custom'>
                                        ¿Estás seguro de que deseas eliminar este Post?
                                    </Modal.Body>
                                    <Modal.Footer className='modal-footer-custom'>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancelar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete()}>
                                            Eliminar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <FooterHome />
                    </div>



                </div>
            </div>


        </>
    );
};

export default MisDestinos;




