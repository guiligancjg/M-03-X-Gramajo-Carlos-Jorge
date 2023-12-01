import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Task } from "../../Types/Task";
import { Link } from "react-router-dom";
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
//import { Border } from 'react-bootstrap-icons';


const CategoriasTareas = ({ tasks }: { tasks: Task[] }) => {
  const categorias = ['PORHACER', 'ENPRODUCCION', 'PORTESTEAR', 'COMPLETADA'];





  //console.log(tasks);
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-md-8" style={{ backgroundColor: '#f0f0f0' }}>
            {/* Contenido de la columna del 60% */}
            <Card className="container-fluid mt-2">
              <Card.Img className='mt-2' variant="top" style={{ minHeight: '200px', maxHeight: '100px', objectFit: 'cover' }} src="https://img.freepik.com/foto-gratis/laboratorio-computacion-brillante-equipo-moderno-tecnologia-generada-ia_188544-22615.jpg?size=626&ext=jpg&ga=GA1.1.1192148877.1697572531&semt=ais cap" />
              <Card.Body>
                <Card.Title>"Rincones Mágicos de Italia"</Card.Title>
                <Card.Text>
                  En mi travesía por Italia, fui cautivado por la Toscana
                  y sus viñedos que se pierden en el horizonte. Las callejuelas 
                  empedradas de Florencia me guiaron a través de la historia, mientras 
                  que las colinas de Chianti me envolvieron en los aromas del vino y la oliva.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>María García</ListGroup.Item>
                <ListGroup.Item>15 de abril al 2 de mayo de 2023</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
            

            <Card className="container-fluid mt-2">
              <Card.Img className='mt-2' variant="top" style={{ minHeight: '200px', maxHeight: '100px', objectFit: 'cover' }} src="https://img.freepik.com/foto-gratis/laboratorio-computacion-brillante-equipo-moderno-tecnologia-generada-ia_188544-22615.jpg?size=626&ext=jpg&ga=GA1.1.1192148877.1697572531&semt=ais cap" />
              <Card.Body>
                <Card.Title>"Rincones Mágicos de Italia"</Card.Title>
                <Card.Text>
                  En mi travesía por Italia, fui cautivado por la Toscana
                  y sus viñedos que se pierden en el horizonte. Las callejuelas 
                  empedradas de Florencia me guiaron a través de la historia, mientras 
                  que las colinas de Chianti me envolvieron en los aromas del vino y la oliva.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>María García</ListGroup.Item>
                <ListGroup.Item>15 de abril al 2 de mayo de 2023</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>





          <div className="col-12 col-md-4" style={{ backgroundColor: '#e0e0e0' }}>
            {/* Contenido de la columna del 40% */}
            <Card border="primary" className="container-fluid mt-2">
              <Card.Header className="mt-2">Header</Card.Header>
              <Card.Body>
                <Card.Title>Primary Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>


        </div>
      </div>

      <Container fluid className="mt-5">
        <Row>
          {/* Columna principal del 60% */}
          <Col md={8} style={{ width: '744px' }}>
            <section id="categorias">
              {categorias.map((categoria, index) => (
                <section className="mb-5" key={index} id="porHacerSection">
                  <h3 className="display-6">
                    Lista de POST
                  </h3>

                  <Row className="d-flex flex-wrap" key={index}>
                    {tasks
                      .filter((task) => task.estado === categoria.toUpperCase())
                      .map((task) => (
                        <Col key={task.id}>
                          <Card className="m-3" style={{ width: '744px', height: '25rem' }}>
                            <img
                              style={{ minHeight: '200px', maxHeight: '100px', objectFit: 'cover' }}
                              className="card-img-top gagp"
                              src={task.imagen}
                              alt={task.titulo}
                            />
                            <Card.Body>
                              <Card.Title style={{ height: '2rem' }}>{task.titulo}</Card.Title>
                              <Card.Text>
                                <span>{`Tiempo: ${task.tiempo}`}</span>
                                <br />
                                <span>{`Responsable: ${task.responsable}`}</span>
                              </Card.Text>

                              <Button
                                variant={
                                  (() => {
                                    switch (categoria.toUpperCase()) {
                                      case 'PORHACER':
                                        return 'primary';
                                      case 'ENPRODUCCION':
                                        return 'dark';
                                      case 'PORTESTEAR':
                                        return 'warning';
                                      case 'COMPLETADA':
                                        return 'success';
                                      default:
                                        return 'default';
                                    }
                                  })()
                                }
                              >
                                <Link to={`/detalle/${task.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                                  Ver más
                                </Link>
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </section>
              ))}
            </section>
          </Col>

          {/* Columna a la derecha del 40% */}
          <Col md={4}>
            {/* Contenido de la columna derecha (puedes personalizar según tus necesidades) */}
            <h4>Contenido de la columna derecha</h4>
            {/* ... */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategoriasTareas


/** row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center g-0
 * 
 * return (

    <>

      <section className="container-fluid mt-5" id="categorias">
        {categorias.map((categoria, index) => (

          <section className="mb-5" key={index} id="porHacerSection">
            <h3 className='display-6' style={{ backgroundColor: colorCate[index], color: '#fff' }}>{cate[index]}</h3>



            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center g-0" key={index}>

              {tasks.filter(task => task.estado === categoria.toUpperCase())
                .map(task => (



                  <Card className='m-3' style={{ width: '75rem', height: '25rem'}} key={task.id}>
                    <img style={{ minHeight: '200px', maxHeight: '100px', objectFit: 'cover'}} className="card-img-top gagp" src={task.imagen} alt={task.titulo} />
                    <Card.Body>
                      <Card.Title style={{ height: '2rem' }}>{task.titulo}</Card.Title>
                      <Card.Text>
                        <span>{`Tiempo: ${task.tiempo}`}</span><br />
                        <span>{`Responsable: ${task.responsable}`}</span>
                      </Card.Text>

                      <Button variant={(() => {
                        switch (categoria.toUpperCase()) {
                          case 'PORHACER':
                            return 'primary';
                          case 'ENPRODUCCION':
                            return 'dark';
                          case 'PORTESTEAR':
                            return 'warning';
                          case 'COMPLETADA':
                            return 'success';
                          default:
                            return 'default';
                        }

                      })()}>

                        <Link to={`/detalle/${task.id}`} style={{ color: '#fff', textDecoration: 'none' }}>Ver más</Link>
                      </Button>



                    </Card.Body>
                  </Card >



                ))
              }
            </div>

          </section>
        ))
        }
      </section >
    </>)
}
 */


/**
 * 
 * 
 * <div className="col" key={task.id}>
                <div className="card h-100">
                  <img style={{ minHeight: '200px', maxHeight: '100px' }} className="card-img-top" src={task.imagen} alt={task.titulo} />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{task.titulo}</h5>
                      <span>{`Tiempo: ${task.tiempo}`}</span><br />
                      <span>{`Responsable: ${task.responsable}`}</span>

                    </div>

                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center d-flex gap-1 align-items-center justify-content-center">

                      <Link to={`/detalle/${task.id}`} className="btn btn-outline-secondary mt-auto">Ver más</Link>
                    </div>
                  </div>

                </div>
              </div>
 */