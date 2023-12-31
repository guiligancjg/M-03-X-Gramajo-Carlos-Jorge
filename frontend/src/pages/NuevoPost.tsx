import NavBar from "../components/Navbar/NavBar";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router-dom";
import FooterHome from "../components/Footer/FooterHome";


const NuevoPost = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { nuevoPost } = useAuth();
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

      const registroExitoso: SignupResult = await nuevoPost(newPost);
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

  return (
    <>
      <NavBar />

      <Container fluid>
        <Row className="justify-content-center">

          <Col md={6}>
            <h1 className="display-6 mt-5">
              Deja tu huella en la comunidad y descubre el Mundo, ingresa tu aventura!!!
            </h1>
            <Form>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="mt-4">Ingrese el Título del Destino</Form.Label>
                <Form.Control type="text" placeholder="Ingrese un título"
                  {...register("title", { required: true })}
                  autoComplete="title"
                  isInvalid={!!errors.title}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="mt-4">Ingrese una descripción</Form.Label>
                <Form.Control as="textarea" rows={9}
                  {...register("description", { required: true })}
                  autoComplete="description"
                  isInvalid={!!errors.description}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label className="mt-3">URL imagen</Form.Label>
                <Form.Control type="text" placeholder="Enter URL or Upload File"
                  {...register("imageURL", { required: true })}
                  autoComplete="imageURL"
                  isInvalid={!!errors.imageURL}
                />
              </Form.Group>

              <Button onClick={onSubmit} variant="primary" type="submit" className="mt-5">
                Crear Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



      <FooterHome />
    </>
  )
}

export default NuevoPost