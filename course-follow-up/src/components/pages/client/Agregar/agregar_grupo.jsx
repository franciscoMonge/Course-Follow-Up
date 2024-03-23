import Navbar from "../../shared/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Agregar_Grupo() {
    const navigate = useNavigate();
    const planificadoresExistentes = ["Grupo 1", "Grupo 2", "Grupo 3"];
    const [planificadorSeleccionado, setPlanificadorSeleccionado] = useState(null);
    const [planificador, setPlanificador] = useState("");

    const handleCheckboxChange = (index) => {
        if (planificadorSeleccionado === index) {
        setPlanificadorSeleccionado(null);
        setPlanificador(""); // Limpiar el estado planificador
        } else {
        setPlanificadorSeleccionado(index);
        setPlanificador(planificadoresExistentes[index]); // Establecer el nombre del planificador seleccionado
        }
    };

    const handleContinuar = () => {
        if (planificador === "") {
        //alert("Debe seleccionar un planificador existente");
        navigate('/AgregarCursos',{});
        } else {
        //alert(`Planificador seleccionado: ${planificador}`);
        navigate('/AgregarCursos',{});
        }
    };

    const handleBack = () =>{
        navigate('/AgregarPlanificador',{});
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
                    {planificadoresExistentes.map((planificadorExistente, index) => (
                        <tr key={index}>
                        <td>{planificadorExistente}</td>
                        <td>
                            <input
                            type="checkbox"
                            checked={planificadorSeleccionado === index}
                            onChange={() => handleCheckboxChange(index)}
                            />
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="form-group d-flex align-items-center">
                <label className="me-2">Crea un nuevo  grupo:</label>
                <input 
                    type="number" 
                    className="form-control m-2" 
                    style={{ width: '200px' }} 
                    min="1" 
                    placeholder="Digita el número" 
                />


                </div>
                <div className="form-group d-flex align-items-center">
                <label className="me-2">Selecciona un horario:</label>
                <input 
                    type="number" 
                    className="form-control m-2" 
                    style={{ width: '200px' }} 
                    min="1" 
                    placeholder="Digita el número" 
                />


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