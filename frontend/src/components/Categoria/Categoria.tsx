import { TaskService } from "../../services/TaskService";
import { useEffect, useState } from "react"
import { Task } from "../../Types/Task"
import CategoriasSelector from "../CategoriasSelector/CategoriasSelector";
import CategoriasTareas from "../CategoriasTareas/CategoriasTareas";

const Categoria = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);

    };
    fetchTasks();
  }, []);


  const handleClickPorHacer = () => {
    const porHacerSection = document.getElementById('porHacerSection');
    if (porHacerSection) {
      porHacerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredTasks = selectedCategory
    ? tasks.filter(task => task.estado.toUpperCase() === selectedCategory.toUpperCase())
    : tasks;
   

  return (
    <>
    <div className="container mt-5">
      {/* Agregar el CategoriasSelector con la función de desplazamiento */}
      <CategoriasSelector
        onSelectedCategory={(categoria) => {
          setSelectedCategory(categoria);
          handleClickPorHacer(); // Desplazar a la sección correspondiente
        }}
      />
      <CategoriasTareas tasks={filteredTasks} />
    </div>

    
  </>
  )
}

export default Categoria



/**
 * <>
    <div className="container mt-5">
      <CategoriasSelector onSelectedCategory={setSelectedCategory} />
      <CategoriasTareas tasks={filteredTasks} />

    </div>
    </>
 *  */