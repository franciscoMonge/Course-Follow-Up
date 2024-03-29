import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../shared/navbar";

const Agregar_Cursos = () => {
  const navigate = useNavigate();

  const [cursos, setCursos] = useState([]);
  const location = useLocation();
  const { grupo } = location.state;
  const [horario, setHorario] = useState('');

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
        setCursos(response.data);
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
    navigate('/AgregarGrupo', {});
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
              <label>{grupo}</label>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Horario:</label>
              <label>{horario}</label> {/* Mostrar el horario del grupo */}
            </div>
          </div>
        </div>
        {/* Resto del contenido */}
      </div>
    </div>
  );
};

export default Agregar_Cursos;
