
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../shared/navbar";

function Agregar_Grupo() {

    const navigate = useNavigate();
    //const gruposExistentes = ["1", "2", "3"];
    const [gruposExistentes, setGruposExistentes] = useState([]);
    const [idGrupoSeleccionado, setidGrupoSeleccionado] = useState(null); //Guarda el INDICE del grupo
    const [grupo, setGrupo] = useState(""); // Estado para almacenar el OBJETO del grupo seleccionado
    const { planificador } = useLocation().state; // Obtener el planificador seleccionado de la ruta anterior

    // Carga todas las actas de la BD en la lista "actas" 
    useEffect(() =>{
        axios.get('http://localhost:3001/grupos')
        .then(response =>{
            console.log(response.data[0])
            setGruposExistentes(response.data[0]);
        })
        .catch(error => {
            console.log('ERROR: Carga Fallida de grupos', error);
        });
    }, []);

    const handleCheckboxChange = (index) => {
        if (idGrupoSeleccionado === index) {
            setidGrupoSeleccionado(null);
            setGrupo(""); // Limpiar el estado grupo
        } else {
            setidGrupoSeleccionado(index);
            setGrupo(gruposExistentes[index]); // Guarda el OBJETO grupo seleccionado
        }
    };

    const handleContinuar = () => {
        if (grupo === "") {
            alert("Debe seleccionar un grupo existente");
        } else {
            navigate('/AgregarCursos', { state: { planificador,grupo,idGrupoSeleccionado} }); // Pasar el nombre del grupo seleccionado
        }
    };

    const handleBack = () =>{
        navigate('/AgregarPlanificador',{ state: { planificador}});
    };

    return (
        <div>
            <Navbar />
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="card m-4 text-center" style={{ width: '800px' }}>
                    <div className="card-header">
                        <h2>Agrega o Selecciona un Grupo</h2>
                    </div>
                    <div className="card-body">
                        <div className="m-3">
                            <label>Selecciona un grupo existente:</label>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Grupo</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gruposExistentes.map((grupoExistente, index) => (
                                        <tr key={index}>
                                            <td>{grupoExistente.numero}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={idGrupoSeleccionado === index}
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
                </div>
            </div>
        </div>
    );
}

export default Agregar_Grupo;
