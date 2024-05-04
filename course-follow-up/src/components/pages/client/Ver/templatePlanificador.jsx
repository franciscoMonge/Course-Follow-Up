import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const App1 = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const fechaInicio = location.state.fechaInicio;
  const fechaFinal = location.state.fechaFinal;
  const añoPlanificador = location.state.añoPlanificador;

  console.log('FechaInicio: ', fechaInicio,' FechaFinal: ', fechaFinal, ' año: ', añoPlanificador);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cursosXFecha?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`);
        const data = response.data;
        const groupedCourses = groupCoursesByGroup(data);
        setCourses(groupedCourses);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCourses();
  }, [fechaInicio, fechaFinal]);

  const groupCoursesByGroup = (data) => {
    const groupMap = new Map();

    data.forEach((course) => {
      const { grupoNumero, grupoHorario } = course;
      const groupId = `#${grupoNumero}`;

      if (!groupMap.has(groupId)) {
        groupMap.set(groupId, {
          groupId,
          color: getRandomColor(),
          horario: grupoHorario,
          courses: [],
        });
      }

      const group = groupMap.get(groupId);
      group.courses.push({
        idgrupoXcurso: course.idgrupoXcurso,
        id: course.idcurso,
        name: course.cursoNombre,
        startDate: new Date(course.fechaInicio),
        endDate: new Date(course.fechaFinal),
        profesor: course.profesor,
        horario: course.cursoHorario,
      });
    });

    return Array.from(groupMap.values());
  };

  const getRandomColor = () => {
    const colors = ['#ffc107', '#28a745', '#007bff', '#dc3545', '#6610f2', '#e83e8c', '#20c997', '#fd7e14'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];


  const handleBack = () =>{
    navigate('/SeleccionaAño',{});
  };

  const handleOpciones = (grupoNumero, cursoNombre) =>{
    navigate('/Opciones',{state:{grupoNumero: grupoNumero, cursoNombre: cursoNombre, fechaInicio: fechaInicio, fechaFinal: fechaFinal, 
      añoPlanificador: añoPlanificador}});
  }


  return (
    <div>
      <h1 className="mb-4">Planificador de Cursos {añoPlanificador}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Grupo</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((group) => (
            <tr key={group.groupId}>
              <td style={{ backgroundColor: group.color, color: 'white', fontWeight: 'bold' }}>
                {group.groupId} - {group.horario}
              </td>
              {months.map((month, index) => (
                <td key={`${group.groupId}-${index}`}>
                  {group.courses
                    .filter(
                      (course) =>
                        new Date(course.startDate).getMonth() === index ||
                        new Date(course.endDate).getMonth() === index
                    )
                    .map((course) => (
                      <div key={course.id} style={{ backgroundColor: group.color, color: 'white', padding: '5px' }}>
                        <button className="btn btn-primary" onClick={() => handleOpciones(group.groupId, course.name)}>Opciones</button>
                        <hr />
                        {course.name}
                        <br />
                        {new Date(course.startDate).getMonth() === index && (
                          <>
                            Inicio: {new Date(course.startDate).getDate()} {months[new Date(course.startDate).getMonth()]}
                            <br />
                          </>
                        )}
                        {new Date(course.endDate).getMonth() === index && (
                          <>
                            Fin: {new Date(course.endDate).getDate()} {months[new Date(course.endDate).getMonth()]}
                            <br />
                          </>
                        )}
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="m-3">
                <hr />
                <button className="btn btn-danger m-4" onClick={handleBack}>Volver</button>
                <button className="btn btn-primary m-4">
                    Modificar
                </button>
                </div>
    </div>
  );
}

export default App1
