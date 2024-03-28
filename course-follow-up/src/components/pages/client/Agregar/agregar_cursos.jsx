import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../shared/navbar";

const Agregar_Cursos = () => {
    const navigate = useNavigate();
  const [cursos, setCursos] = useState([
    { id: 1, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 2, nombre: 'Bodegas 2', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'KyJ' },
    { id: 3, nombre: 'Matemática', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 4, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 5, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 6, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 7, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 8, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
    { id: 9, nombre: 'Bodegas 1', profesor: '', fechaInicio: '', fechaFinalizacion: '', horario: 'LyM' },
  ]);

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
    navigate('/AgregarGrupo',{});
  };

  return (
    <div>
        <Navbar />
        <div className="container" style={{ paddingTop: '80px' }}>
        <h3>Agregar Planificación</h3>
        <div className="row">
            <div className="col">
            <div className="form-group">
                <label>Grupo:</label>
                <select className="form-control">
                {/* Opciones de grupo */}
                </select>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
                <label>Horario:</label>
                <select className="form-control">
                {/* Opciones de horario */}
                </select>
            </div>
            </div>
        </div>
        <div className="row">
            {cursos.map(curso => (
            <div key={curso.id} className="col-md-4 mb-4">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{curso.nombre}</h5>
                    <div className="form-group">
                    <label>Profesor:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={curso.profesor}
                        onChange={(e) => handleChange(e, curso.id, 'profesor')}
                    />
                    </div>
                    <div className='form group'>
                    <label>Fecha Inicio:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={curso.fechaInicio}
                        onChange={(e) => handleChange(e, curso.id, 'profesor')}
                    />
                    </div>
                    <div className='form group'>
                    <label>Fecha Final:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={curso.fechaFinalizacion}
                        onChange={(e) => handleChange(e, curso.id, 'profesor')}
                    />
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        <div className="row">
        <div className="col">
            <button type="button" className="btn btn-danger" onClick={handleBack}>
                Volver
            </button>
            </div>
            <div className="col">
            <button type="button" className="btn btn-primary">
                Confirmar
            </button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Agregar_Cursos;