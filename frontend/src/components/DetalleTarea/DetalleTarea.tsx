import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TaskService } from '../../services/TaskService';
import { Task } from '../../Types/Task';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; //Redirigir al usuario a la pagina principal
import { Button, Card } from 'react-bootstrap';

const DetalleTarea = () => {
  const { taskId } = useParams<{ taskId?: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [estado, setEstado] = useState<string>('');
  const [relatedTasks, setRelatedTasks] = useState<Task[] | null>(null);

  const navigate = useNavigate(); //Redirigir al usuario a la pagina principal
  console.log(taskId);

  useEffect(() => {

    //---------- OBTENER UNA TAREA ----------
    const fetchTask = async () => {
      try {
        if (taskId && !isNaN(parseInt(taskId, 10))) {
          const taskData = await TaskService.getOneTask(parseInt(taskId, 10));
          setTask(taskData);

          const tasksInCategory = await TaskService.getTasksInCategory(taskData.estado);
          setRelatedTasks(tasksInCategory);
        } else { navigate('/tarea-no-encontrada');}
      } catch (error) {
        console.error('Error al cargar la tarea:', error);
      }
    };

    fetchTask();
  }, [taskId, navigate]);


  //--------- CAMBIAR ESTADO A UNA TAREA --------

  const handleUpdateState = async () => {
    console.log(estado);
    if (estado !== '') {
      try {
        const updatedTask = await TaskService.updateStateTask(parseInt(taskId!, 10), estado);
        // Actualiza la tarea local con la tarea actualizada
        setTask(updatedTask);
        // Muestra una notificación de éxito utilizando react-toastify
        toast.success('Estado de la tarea actualizado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        // Maneja errores de la actualización de la tarea y muestra una notificación de error
        toast.error('Error al actualizar el estado de la tarea', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    } else {
      // Si el estado está vacío, muestra un mensaje de error y una notificación
      toast.error('Selecciona un estado válido', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error('Selecciona un estado válido');
    }
  };


  //----------- ELIMINAR UNA TAREA -------------
  
  const handleDeleteTask = async () => {
    try {
      if (taskId) {
        await TaskService.deleteTask(parseInt(taskId, 10));
        toast.success('Tarea eliminada correctamente', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        });
        console.log('Tarea eliminada con éxito')
        // Redirige al usuario a la página principal después de eliminar la tarea
        navigate('/');

        
      }
    } catch (error) {
      
      toast.error('Error al eliminar la tarea', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      });
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const scrollSmoothTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
    <div className="container mt-5">
      {task && (
        <div className="row">
          <div className="col-12 col-md-6">
            <img className="card-img-top mb-5" src={task.imagen} alt={task.titulo} />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="display-5 fw-bolder">{task.titulo}</h1>
            <h5>Estado actual: {task.estado}</h5>
            <p className="lead">Tiempo: {task.tiempo}</p>
            <p className="lead">Responsable: {task.responsable}</p>
            <p className="lead" id="producto-descripcion">
              Descripción: {task.descripcion}
            </p>
            <select className="form-select mb-3" onChange={(e) => setEstado(e.target.value)} value={estado}>
              <option value="">Seleccionar estado</option>
              <option value="PORHACER">Por hacer</option>
              <option value="ENPRODUCCION">En producción</option>
              <option value="PORTESTEAR">Por testear</option>
              <option value="COMPLETADA">Completada</option>
            </select>

            <button className="btn btn-danger" onClick={handleDeleteTask}>
              Eliminar Tarea
            </button>
            <button className="btn btn-primary ms-2" onClick={handleUpdateState}>
              Actualizar Estado
            </button>
            
          </div>
        </div>
      )}
      </div>


      <div className='container mt-5'>
        {relatedTasks && (
      <div className="d-flex flex-wrap">
        {relatedTasks.map((relatedTask) => (
          <div className=" row row-cols-1 row-cols-md-2 text-center row-cols-xl-4 g-0" key={relatedTask.id}>
          <Card className='m-3' style={{ width: '18rem'}}>
          <img style={{ minHeight: '200px', maxHeight: '100px' }} className="card-img-top gagp" src={relatedTask.imagen} alt={relatedTask.titulo} />
          <Card.Body>
            <Card.Title style={{ height: '8rem' }}>{relatedTask.titulo}</Card.Title>
            <Card.Text>
              <span>{`Tiempo: ${relatedTask.tiempo}`}</span><br />
              <span>{`Responsable: ${relatedTask.responsable}`}</span>
            </Card.Text>
            
            <Button variant="primary" onClick={() => navigate(`/detalle/${relatedTask.id}`)}>

              <Link to={`/detalle/${relatedTask.id}`} onClick={() => scrollSmoothTo("detalle-section")} style={{ color: '#fff', textDecoration: 'none' }}>Ver más</Link>
            </Button>



          </Card.Body>
        </Card >
          </div>
        ))}
      </div>
      )}
    </div>
    </>
  );
};

export default DetalleTarea;


