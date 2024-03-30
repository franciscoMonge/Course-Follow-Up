import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../shared/navbar";

const Agregar_Cursos_Indiv = () => {
  const navigate = useNavigate();

  const location = useLocation();
  //De la página anterior debemos traer 
  //Cursos, curso seleccionado, grupo, horario
  const { cursos} = location.state;
  const {cursoSeleccionado} =  location.state;
  const { grupo } = location.state;
  const { horario} = location.state;
  
  // Variables para guardar los cambios
  const [profesor, setProfesor] = useState(cursos[cursoSeleccionado].profesor);
  const [fechaInicio, setFechaInicio] = useState(cursos[cursoSeleccionado].fechaInicio);
  const [fechaFinal, setFechaFinal] = useState(cursos[cursoSeleccionado].fechaFinal);
  const[horarioGrupo, setHorarioGrupo] = useState(horario);
  
  

  const handleConfirmar = () => {
    // Actualizar el estado de los cursos con los nuevos valores
    const updatedCursos = [...cursos];
    updatedCursos[cursoSeleccionado].profesor = profesor;
    updatedCursos[cursoSeleccionado].fechaInicio = fechaInicio;
    updatedCursos[cursoSeleccionado].fechaFinal = fechaFinal;
    updatedCursos[cursoSeleccionado].horario = horarioGrupo;


    console.log('Confirmar cambios');
    console.log(updatedCursos[cursoSeleccionado].profesor,
        updatedCursos[cursoSeleccionado].fechaInicio,
        updatedCursos[cursoSeleccionado].fechaFinal,
        updatedCursos[cursoSeleccionado].horario)
    };

    const handleChange = (e) => {
        console.log('INFO DEL SELECT')
        console.log(e.target.value)
        setHorarioGrupo(e.target.value);
    };

  const handleBack = () => {
    navigate('/AgregarCursos', { state: { cursos, cursoSeleccionado,grupo, horario } });
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
    </div>
    <br></br>

    <div className="row">
      <div className="col-md-12 mb-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{cursos[cursoSeleccionado].nombre_curso}</h5>
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
              <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleChange}>
                <option value = "Lunes y Miércoles" selected>Lunes y Miércoles</option>
                <option value="Martes y Jueves">Martes y Jueves</option>

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
