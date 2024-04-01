import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../shared/navbar";

const Agregar_Cursos_Indiv = () => {
  const navigate = useNavigate();

  const location = useLocation();
  //De la página anterior debemos traer 
// cursos, idCursoSeleccionado,cursoSeleccionado, grupo, idGrupo, horario
  const { cursos} = location.state; 
  const { idCursoSeleccionado} = location.state; //Este es el ID del cruso
  const {cursoSeleccionado} =  location.state; //Este es el OBJETO curso
  const {numero} = location.state;
  const { idGrupo } = location.state; //Este es el ID del grupo
  const { horario} = location.state; //Este es el horario del GRUPO


  // Variables para guardar los cambios
  const [profesor, setProfesor] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [horarioCurso, setHorarioCurso] = useState('');

  useEffect(() => {
    if (cursoSeleccionado) {
      setProfesor(cursoSeleccionado.profesor || '');
      setFechaInicio(cursoSeleccionado.fechaInicio || '');
      setFechaFinal(cursoSeleccionado.fechaFinal || '');
      setHorarioCurso(horario || '');
    }
  }, [cursoSeleccionado,horario]);
  
  
  const handleConfirmar = () => {
    //Validaciones extra por confimar:
    //1. Si ya existe un profesor asginado para esas mismas fechas y horario
    //2. Si ya asignó para ese mismo grupo, otro curso en las mismas fechas
    console.log("Fecha inicio: ", fechaInicio);
    console.log("Fecha final: ", fechaFinal);
    console.log("Horario Curso: ", horarioCurso);
    console.log("Profesor: ", profesor);
    //Validar que no haya información en blanco (El profe puede quedar en blanco)
    if (!fechaInicio || !fechaFinal || !horarioCurso) {
        console.log("Fecha inicio: ", fechaInicio);
        console.log("Fecha final: ", fechaFinal);
        console.log("Horario Curso: ", horarioCurso);
        console.log("Profesor: ", profesor);
      alert('Por favor completa todos los campos');
      return;
    }
  
    // Validar que las fechas tengan concordancia
    if (fechaInicio > fechaFinal) {
      alert('La fecha de inicio debe ser anterior a la fecha final');
      return;
    }
  
    // Validar que haya una distancia mínima de 1 mes entre las fechas
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinalObj = new Date(fechaFinal);
    const diferenciaMeses = (fechaFinalObj.getFullYear() - fechaInicioObj.getFullYear()) * 12 + fechaFinalObj.getMonth() - fechaInicioObj.getMonth();
    if (diferenciaMeses < 1) {
      alert('Debe haber una distancia mínima de 1 mes entre la fecha de inicio y la fecha final');
      return;
    }
  
    // Validar que el horario del curso coincida con el horario del grupo
    if (horarioCurso !== horario) {
      alert('El horario del curso debe coincidir con el horario del grupo');
      return;
    }
    
    // Llamar a la API para actualizar los cursos
    axios.post('http://localhost:3001/actualizarCursos', {
        idGrupo: idGrupo, //En mi MYSQL las inserciones empiezan en 1 
        idCurso: idCursoSeleccionado+1,//En mi MYSQL las inserciones empiezan en 1,por eso hay que sumarle 1
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal,
        profesor: profesor,
        horario: horarioCurso
    })
    .then(response => {
        console.log('Curso actualizado correctamente:', response.data);
        alert("Curso actualizado correctamente");
        navigate('/AgregarCursos', { state: { idGrupo, numero, horario  } });
        // Aquí puedes realizar otras acciones después de actualizar los cursos, como mostrar un mensaje de éxito, etc.
    })
    .catch(error => {
        console.error('Error al actualizar curso:', error);
        alert("Error al actualizar el curso");
        // Aquí puedes manejar el error, mostrar un mensaje de error al usuario, etc.
    });


  };
  

    const handleChange = (e) => {
        // console.log("Profesor: ", profesor);
        // console.log("Profesor .: ", cursoSeleccionado.profesor);
        console.log('INFO DEL SELECT')
        console.log(e.target.value)
        setHorarioCurso(e.target.value);
    };

  const handleBack = () => {
    
    navigate('/AgregarCursos', { state: { idGrupo, numero, horario  } });
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
          <h5>{numero}</h5> 
 
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
    </div>
    <br></br>

    <div className="row">
      <div className="col-md-12 mb-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{cursoSeleccionado.nombre_curso}</h5>
            <div className="form-group">
              <label>Profesor:</label>
              <input
                type="text"
                className="form-control"
                value={profesor}
                onChange={(e) => setProfesor(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Fecha Inicio:</label>
              <input
                type="date"
                className="form-control"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Fecha Final:</label>
              <input
                type="date"
                className="form-control"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Horario:</label>
                <select 
                        className="form-select form-select-sm" 
                        aria-label=".form-select-sm example" 
                        onChange={handleChange}
                        value={horarioCurso || ''}>
                        <option value="L-M">L-M</option>
                        <option value="K-J">K-J</option>
                </select>
            </div>
            <button className="btn btn-success m-4" onClick={handleConfirmar}>Confirmar cambios</button>
          </div>
        </div>
      </div>
    </div>

    <div className="m-3">
      <hr />
      <button className="btn btn-danger m-4" onClick={handleBack}>Volver</button>
    </div>
  </div>
</div>

  );
};

export default Agregar_Cursos_Indiv;
