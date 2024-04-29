import Navbar from "../../shared/navbar";
import { useNavigate, useLocation } from "react-router-dom";
import CustomCarousel from "./Carousel";

function Modificar_Planificacion () {
    const location = useLocation(); // Variables locales traidas desde anterior pagina
    const navigate = useNavigate(); // Variable para navegación

    // Variables recuperadas de la pagina anterior
    const { courses } = location.state
    const { añoPlanificador } = location.state

    console.log("CURSOS", courses);

    courses.forEach((course, index) => {
        console.log(`GRUPO ${index + 1}: ${course.horario}  ${course.groupId} ${course.courses} ${course.color}`);
    });
    
    // Mapear los cursos para extraer solo las características deseada
    const grupos = courses.map((course) => {
    // Para acceder a los cursos dentro de cada grupo, puedes hacerlo directamente con course.courses
    const horario = course.horario;
    const grupoId = course.groupId;
    const cursos = course.courses;
    const color = course.color;
    console.log(horario, grupoId, cursos)
    // Retornar un nuevo objeto con las características deseadas
    return {
      horario,
      grupoId,
      cursos, 
      color
    };
  });

  const handleBack = () =>{
    navigate('/SeleccionaAño',{});
  };
      
  return (
    <div>
      <Navbar />
      <div style={{ marginBottom: '40px', marginTop: '120px' }}>
        <h1 className="mb-4">Modificar Planificación {añoPlanificador}</h1>
      </div>
      
      <div>
        <CustomCarousel grupos={grupos}/>
      </div>
      
      <div>
        <button style={{ backgroundColor: '#000000' }} onClick={handleBack}>Volver</button>
      </div>
    </div>
  );
}

export default Modificar_Planificacion;