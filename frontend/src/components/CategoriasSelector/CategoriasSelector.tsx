import { BsBookmarkCheck, BsCheck, BsGear, BsPencilSquare } from 'react-icons/bs'
import Button from 'react-bootstrap/Button';


interface CategoriasSelectorProps {
  onSelectedCategory: (categoria: string) => void;

}

const CategoriasSelector: React.FC<CategoriasSelectorProps> = ({onSelectedCategory}) => {
  const categorias = [
    { nombre: 'PORHACER', icono: <BsCheck />},
    { nombre: 'ENPRODUCCION', icono: <BsGear />},
    { nombre: 'PORTESTEAR', icono: <BsPencilSquare />},
    { nombre: 'COMPLETADA', icono: <BsBookmarkCheck />},
  ];


  const handleClickCategory = (categoria: string) => {
    onSelectedCategory(categoria);

    // Lógica de desplazamiento suave a la sección correspondiente
    const sectionId = `${categoria.toLowerCase()}Section`;
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section className="container mt-3" id="selector-categorias">
      <p className='fs-3'>Seleccione una categoria</p>
      <div className='row gap-4'>
        {categorias.map((categoria, index)=> (
            <div className='col d-flex justify-content-center p-0' key={index}>
              <Button 
              variant={(() => { 
                switch (categoria.nombre) {
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

               
              })()}
              
              
              onClick={()=> handleClickCategory(categoria.nombre)}
                className='d-flex gap-1 align-items-center rounded p-3 text-decoration-none'
                style={{cursor: 'pointer'}}>
                    {categoria.icono} {categoria.nombre} 
              </Button>
              
                
            </div>
        ))}
      </div>
    </section>
  )
}

export default CategoriasSelector



/**
 * <button 
                onClick={()=> onSelectedCategory(categoria.nombre)}
                className='border border-1 border-black d-flex gap-1 align-items-center rounded p-1 text-decoration-none'
                style={{cursor: 'pointer'}}>
                    {categoria.icono} {categoria.nombre}
                </button>
 * 
 */