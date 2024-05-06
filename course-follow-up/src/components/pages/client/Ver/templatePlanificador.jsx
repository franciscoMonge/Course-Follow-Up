import { useNavigate, useLocation } from "react-router-dom";
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
  const [fusiones, setFusiones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, fusionesResponse] = await Promise.all([
          axios.get(`http://localhost:3001/cursosXFecha?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`),
          axios.get('http://localhost:3001/fusiones')
        ]);
  
        const groupedCourses = groupCoursesByGroup(coursesResponse.data);
        setCourses(groupedCourses);
        setFusiones(fusionesResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData();
  }, [fechaInicio, fechaFinal]);


  const groupCoursesByGroup = (data) => {
    console.log('AQUI FRAN: ', data);
    const groupMap = new Map();

    data.forEach((course) => {
      console.log('AQUI FRAN2: ', course.idcurso);
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
        grupo_id: course.idgrupo,
        idGRUPO: course.grupoNumero,
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


  const getFusionesForIdGrupoXCurso = (idgrupoXcurso, fusiones) => {
    const fusionesRelacionadas = [];
  
    fusiones.forEach(fusion => {
      if (fusion.idgrupoXcurso1 === idgrupoXcurso) {
        fusionesRelacionadas.push(fusion.numero_grupo_2);
      } else if (fusion.idgrupoXcurso2 === idgrupoXcurso) {
        fusionesRelacionadas.push(fusion.numero_grupo_1);
      }
    });
  
    return fusionesRelacionadas;
  };

  const getRandomColor = () => {
    const colors = ['#ffc107', '#28a745', '#007bff', '#dc3545', '#6610f2', '#e83e8c', '#20c997', '#fd7e14', '#891652', '#0B60B0', 
    '#7E6363', '#116D6E', '#E96479', '#43766C', '#CD5C08', '#BE3144', '#9A3B3B', '#1B4242', '#363062', '#8B9A46', '#2D4263', '#C060A1', 
    '#FFAC41'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];


  const handleBack = () =>{
    navigate('/SeleccionaAño',{});
  };

  const handleModify = () => {
    navigate('/Modificar_Planificacion', { state: { courses, añoPlanificador}})
  }

  const handleOpciones = (idgrupoXcurso, grupo_id, grupoNumero, idcurso, cursoNombre) =>{
    navigate('/Opciones',{state:{idgrupoXcurso: idgrupoXcurso, grupo_id: grupo_id, grupoNumero: grupoNumero, idcurso: idcurso, cursoNombre: cursoNombre, fechaInicio: fechaInicio, fechaFinal: fechaFinal, 
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
                        <hr />
                        <button className="btn btn-light" onClick={() => handleOpciones(course.idgrupoXcurso, course.grupo_id, course.idGRUPO, course.id, course.name)}>Opciones</button>
                        
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
                        <div>
                        <strong>Fusión:</strong>{' '}
                          {fusiones.length > 0 &&
                            getFusionesForIdGrupoXCurso(course.idgrupoXcurso, fusiones).map((fusion, index) => (
                              <span key={index}>
                                #{fusion}
                                {index < getFusionesForIdGrupoXCurso(course.idgrupoXcurso, fusiones).length - 1 ? ' - ' : ''}
                              </span>
                            ))}
                        </div>
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button style={ { backgroundColor: 'black'}} onClick={handleBack}>
          Volver
        </button>
        
        <button style={{ background: '#092D4E', marginLeft: '20px'}} onClick={handleModify}>
          Modificar
        </button>
      </div>
    </div>
  );
}

export default App1
