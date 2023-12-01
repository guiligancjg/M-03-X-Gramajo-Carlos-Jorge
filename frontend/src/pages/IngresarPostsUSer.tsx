import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import "./stylesGlobal.css"


// Definir el tipo para los valores del formulario
interface FormValues {
  titulo: string;
  descripcion: string;
}

// Definir el esquema de validación con Yup
const validationSchema = Yup.object({
  titulo: Yup.string().required('El título es obligatorio'),
  descripcion: Yup.string().required('La descripción es obligatoria'),
});


const IngresarPostsUSer: React.FC = () => {
  // Función que maneja el envío del formulario
  const handleSubmit = (values: FormValues,
    actions: FormikHelpers<FormValues>) => {
    // Aquí puedes realizar acciones con los valores del formulario
    console.log(values);
    actions.resetForm();
  };




  return (
    <>
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Formulario de Viaje</div>
            <div className="card-body">
              {/* Utilizar Formik para manejar el formulario */}
              <Formik
                initialValues={{ titulo: '', descripcion: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    {/* Utilizar Field para manejar el campo de título */}
                    <Field
                      type="text"
                      className="form-control"
                      id="titulo"
                      name="titulo"
                      placeholder="Ingrese el título del viaje"
                    />
                    {/* Utilizar ErrorMessage para mostrar mensajes de error */}
                    <ErrorMessage name="titulo" component="div" className="text-danger" />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="descripcion">Descripción:</label>
                    {/* Utilizar Field para manejar el campo de descripción */}
                    <Field
                      as="textarea"
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      rows={5}
                      placeholder="Ingrese la descripción del viaje"
                    />
                    {/* Utilizar ErrorMessage para mostrar mensajes de error */}
                    <ErrorMessage name="descripcion" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Enviar
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default IngresarPostsUSer