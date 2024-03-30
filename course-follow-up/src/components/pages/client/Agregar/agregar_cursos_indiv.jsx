import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../shared/navbar";

const Agregar_Cursos_Indiv = () => {
  const navigate = useNavigate();

  const location = useLocation();
  //De la página anterior debemos traer 
  //Cursos, curso seleccionado, grupo, horario
  const { cursos } = location.state;
  const {cursoSeleccionado} =  location.state;
  const { grupo } = location.state;
  const { horario} = location.state;


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
    navigate('/AgregarCursos', { state: { cursos, cursoSeleccionado,grupo, horario } });
  };


//   const prueba = () => {
//     console.log("Cursos: ", cursos);
//     console.log("Grupo: ", grupo);
//     console.log("Horario: ", horario);
//     console.log("Curso Seleccionado: ", cursoSeleccionado);
//   };


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
                value={cursos[cursoSeleccionado].profesor}
                onChange={(e) => handleChange(e, curso.id, 'profesor')}
              />
            </div>
            <div className='form-group'>
              <label>Fecha Inicio:</label>
              <input
                type="date"
                className="form-control"
                value={cursos[cursoSeleccionado].fechaInicio}
                onChange={(e) => handleChange(e, curso.id, 'fechaInicio')}
              />
            </div>
            <div className='form-group'>
              <label>Fecha Final:</label>
              <input
                type="date"
                className="form-control"
                value={cursos[cursoSeleccionado].fechaFinal}
                onChange={(e) => handleChange(e, curso.id, 'fechaFinalizacion')}
              />
            </div>
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
