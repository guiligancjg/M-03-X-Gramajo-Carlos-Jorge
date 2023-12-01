//import Card from 'react-bootstrap/Card';
//import { Accordion, ListGroup } from 'react-bootstrap';
//import { Accordion } from 'react-bootstrap';
import React, { useState, useEffect, useMemo } from "react";
import { ApiResponse } from "../Types/TodosLosPorst"
import { Card, ListGroup, Accordion } from "react-bootstrap";


const BASE_URL = "http://localhost:4010/postsintoken";


const PostHome: React.FC = () => {

    const [data, setData] = useState<ApiResponse | null>(null);

    const TaskService = useMemo(() => {
        return {
            getAllPosts: async (): Promise<ApiResponse> => {
                try {
                    const response = await fetch(BASE_URL);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error fetching data:', error);
                    throw error;
                }
            },
        };
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await TaskService.getAllPosts();
                setData(result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [TaskService]);



    
    return (
        <>
 

 <div className="container mt-2">
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


                <div className="container-fluid mt-2">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            {data?.posts && data?.posts.map((post) => (
                                <div key={post._id}>
                                    {/* Contenido de la columna del 60% */}`

                                    <Card className="container-fluid">
                                        <Card.Img className='mt-2' variant="top" style={{ minHeight: '200px', maxHeight: '100px', objectFit: 'cover' }}
                                            src={post.imageURL} />
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <Card.Text>{post.description}</Card.Text>

                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{
                                                new Date(post.createdAt).toLocaleDateString('es-AR', { weekday: "long", year: "numeric", month: "short", day: "numeric" })

                                            }</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                            <Card.Link href="#">Leer más...</Card.Link>
                                        </Card.Body>
                                    </Card>

                                    <Accordion defaultActiveKey="0">
                                        {data?.comments && data.comments.map((comment) => (
                                            <div key={comment._id}>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>{comment.author.username}</Accordion.Header>
                                                    <Accordion.Body>{comment.description}</Accordion.Body>
                                                </Accordion.Item>
                                            </div>
                                        ))}
                                    </Accordion>
                                </div>

                            ))}
                        </div>





                        <div className="col-12 col-md-4">
                            {/* Contenido de la columna del 40% */}
                            {data?.posts && data.posts.map((post) => (
                                <div key={post._id}>
                                    <Card className="container-fluid mt-4">
                                        <Card.Header className="mt-2">{
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

       
        </>
    );
};

export default PostHome