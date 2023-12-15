import NavBar from "../components/Navbar/NavBar";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router-dom";
import FooterHome from "../components/Footer/FooterHome";
import { udatePost } from "../api/auth";
import { useEffect, useState } from "react";



const EditarPost = () => {
  const { idPost, idDelPosteo } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const navigate = useNavigate();
  //const [exito, setExito] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newPost = {
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,

      }

      type SignupResult = boolean | void;

      const registroExitoso: SignupResult = await udatePost(newPost, idDelPosteo);
      if (typeof registroExitoso === 'boolean') {

        if (registroExitoso) {
          console.log('Se creo el post', registroExitoso);
          //setShowError(false)
          // setExito(registroExitoso)
          /*setTimeout(() => {
              navigate("/login");
            }, 2000);*/


        } else {
          //setShowError(true)
          console.log('Registro fallido');
        }
      } else {

        console.log('La función nuevoPost no devolvió un valor booleano');
      }

      navigate("/destinos");

    } catch (error) {
      console.log("Se a producido un error en la creación de un Post", error);
    }
  });




  useEffect(() => {
    const cargarDatosConRetraso = () => {
      setTimeout(() => {
        setTitle(idPost?.title || '');
        setDescription(idPost?.description || '');
        setImageURL(idPost?.imageURL || '');
      }, 1); // Espera 2 segundos antes de cargar los datos
    };

    cargarDatosConRetraso(); // Inicia la carga de datos después de 2 segundos
  }, [idPost?.title,idPost?.description,idPost?.imageURL]);


  
  return (
    <>
      <NavBar />

      <Container fluid>
        <Row className="justify-content-center">

          <Col md={6}>
            <h1 className="display-6 mt-5">
              Editar post
            </h1>
            <Form className="mt-3">

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="mt-5">Ingrese el Título del Destino</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese un título"
                  {...register("title")}
                  autoComplete="title"
                  isInvalid={!!errors.title}
                  value={title}  // Asigna el estado como valor inicial del input
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>


              <Form.Group controlId="exampleForm.ControlTextarea2">
                <Form.Label className="mt-5">Ingrese una descripción</Form.Label>
                <Form.Control as="textarea" rows={9}
                 placeholder="Ingrese un detalle"
                 {...register("description")}
                 autoComplete="description"
                 isInvalid={!!errors.description}
                 value={description}  // Asigna el estado como valor inicial del input
                 onChange={(e) => setDescription(e.target.value)}


                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label className="mt-5">URL imagen</Form.Label>
                <Form.Control type="text" 
                  placeholder="Enter URL or Upload File"
                  {...register("imageURL")}
                  autoComplete="imageURL"
                  isInvalid={!!errors.imageURL}
                  value={imageURL}  // Asigna el estado como valor inicial del input
                  onChange={(e) => setImageURL(e.target.value)}

                />
              </Form.Group>

              <Button onClick={onSubmit} variant="primary" type="submit" className="mt-5">
                Guardar Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



      <FooterHome />
    </>
  )
}

export default EditarPost