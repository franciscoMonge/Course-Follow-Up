import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../../shared/navbar';

const Agregar_Cursos_Indiv = () => {
  const navigate = useNavigate();
  const mounted = useRef(false);
  const location = useLocation();

  const { cursos } = location.state;
  const { idCurso } = location.state;
  const { cursoSeleccionado } = location.state;
  const { numero } = location.state;
  const { idGrupo } = location.state;
  const { horario } = location.state;

  const [profesor, setProfesor] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [horarioCurso, setHorarioCurso] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [validationsCompleted, setValidationsCompleted] = useState(false);

  useEffect(() => {
    if (cursoSeleccionado) {
      setProfesor(cursoSeleccionado.profesor || '');
      setFechaInicio(cursoSeleccionado.fechaInicio || '');
      setFechaFinal(cursoSeleccionado.fechaFinal || '');
      setHorarioCurso(cursoSeleccionado.horario || horario || '');
    }
  }, [cursoSeleccionado, horario]);

  const validarDiaFecha = () => {
    // Lógica de validación
  };

  const validarDistanciaFechas = () => {
    // Lógica de validación
  };

  const validarHorarioCursoGrupo = () => {
    // Lógica de validación
  };

  const validarDistanciaCursosIguales = async () => {
    // Lógica de validación
  };

  const validarDistanciaUnaSemana = async () => {
    // Lógica de validación
  };

  const handleConfirmar = () => {
    if (!fechaInicio || !fechaFinal || !horarioCurso) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    validarHorarioCursoGrupo();
    validarDiaFecha();
    validarDistanciaFechas();
    validarDistanciaCursosIguales();
    validarDistanciaUnaSemana();
  };

  const handleContinue = () => {
    setShowWarning(false);
    setValidationsCompleted(true);
  };

  const handleCerrarModal = () => {
    setShowWarning(false);
    setValidationsCompleted(false);
  };

  const handleConfirm = () => {
    if (validationsCompleted) {
      axios
        .post('http://localhost:3001/actualizarCursos', {
          idGrupo: idGrupo,
          idCurso: idCurso,
          fechaInicio: fechaInicio,
          fechaFinal: fechaFinal,
          profesor: profesor,
          horario: horarioCurso
        })
        .then((response) => {
          console.log('Curso actualizado correctamente:', response.data);
          toast.success('Curso actualizado correctamente');
          setTimeout(() => {
            navigate('/AgregarCursos', { state: { idGrupo, numero, horario } });
          }, 3000);
        })
        .catch((error) => {
          console.error('Error al actualizar curso:', error);
          toast.error('Error al actualizar el curso');
        });
    }
  };

  useEffect(() => {
    if (continueUpdate) {
      setValidationsCompleted(true);
    }
  }, [continueUpdate]);

  useEffect(() => {
    if (!showWarning) {
      setValidationsCompleted(false);
    }
  }, [showWarning]);

  const handleChange = (e) => {
    setHorarioCurso(e.target.value);
  };

  const handleBack = () => {
    navigate('/AgregarCursos', { state: { idGrupo, numero, horario } });
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: '80px' }}>
        <ToastContainer position="top-center" />
        <h3>Agregar Planificación</h3>
        {showWarning && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Advertencia</h5>
                  <button type="button" className="btn-close" onClick={handleCerrarModal}></button>
                </div>
                <div className="modal-body">
                  {warningMessage}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCerrarModal}>Cerrar</button>
                  <button type="button" className="btn btn-primary" onClick={handleContinue}>Continuar</button>
                </div>
              </div>
            </div>
          </div>
        )}
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
                    value={
                      horarioCurso === 'Lunes y Miércoles' ? 'L-M' :
                      horarioCurso === 'Martes y Jueves' ? 'K-J' :
                      horarioCurso // Si no coincide con ninguno de los casos anteriores, se utiliza el valor actual de horarioCurso
                    }
                  >
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

