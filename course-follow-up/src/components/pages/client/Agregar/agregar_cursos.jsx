import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../shared/navbar";

const Agregar_Cursos = () => {
  const navigate = useNavigate();

  const [cursos, setCursos] = useState([]);
  const location = useLocation();
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [curso, setCurso] = useState(""); // Estado para almacenar el nombre del curso seleccionado
  const { grupo } = location.state;
  const [horario, setHorario] = useState('');


  const handleCheckboxChange = (index) => {
    if (cursoSeleccionado === index) {
        setCursoSeleccionado(null);
        setCurso(""); // Limpiar el estado curso
    } else {
        setCursoSeleccionado(index);
        setCurso(cursos[index]); // Establecer el nombre del grupo seleccionado
    }
  };



  // Función para cargar el horario del grupo
  const cargarHorarioGrupo = () => {
    axios.get(`http://localhost:3001/horario/${grupo}`)
      .then(response => {
        console.log('Horario: ', response.data[0][0].horario);
        setHorario(response.data[0][0].horario);
      })
      .catch(error => {
        console.log('ERROR: Carga fallida de horario del grupo', error);
      });
  };

  // Carga todos los cursos de la BD en la lista "cursos" 
  useEffect(() => {
    console.log('Grupo pag anterior: ', grupo);
    cargarHorarioGrupo(); // Cargar el horario del grupo al montar el componente
    axios.get(`http://localhost:3001/cursos/${grupo}`)
      .then(response => {
        console.log('cargando cursos');
        console.log('cursos: ', response.data[0]);
        setCursos(response.data[0]);
      })
      .catch(error => {
        console.log('ERROR: Carga fallida de cursos', error);
      });
     

  }, [grupo]); // Grupo como dependencia para recargar los cursos cuando cambie

  const handleChange = (e, id, field) => {
    const updatedCursos = cursos.map(curso => {
      if (curso.id === id) {
        return { ...curso, [field]: e.target.value };
      }
      return curso;
    });
    setCursos(updatedCursos);
  };

  const handleBack = () => {
    navigate('/AgregarGrupo', { state: { grupo }} );
  };

  //A la siguiente pestaña hay que enviar Cursos, curso seleccionado, grupo, horario
  const handleContinuar = () => {
    navigate('/AgregarCursoIndividual', { state: { cursos, cursoSeleccionado,grupo, horario } }); // Pasar el nombre del planificador seleccionado
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: '80px' }}>
        <h3>Agregar Planificación</h3>
        <div className="row">
          <div className="col">
            <div className="form-group">
            <span className="badge bg-light text-dark">
            <h5>Grupo:</h5>
            <h5>{grupo}</h5>  
            </span>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
            <span className="badge bg-light text-dark">
            <h5>Horario del grupo:</h5>
            <h5>{horario}</h5>  
            </span>
            </div>
          </div>
        <div className="row">
        <label>Seleccione un curso:</label>
        <div className = "row"></div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Curso</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{curso.nombre_curso}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={cursoSeleccionado === index}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div>


        <div className="m-3">
                            <hr />
                            <button className="btn btn-danger m-4" onClick={handleBack}>Volver</button>
                            <button className="btn btn-primary m-4" onClick={handleContinuar}>
                                Continuar
                            </button>
                        </div>
        </div>


        {/* Resto del contenido */}
      </div>
    </div>
  );
};

export default Agregar_Cursos;
