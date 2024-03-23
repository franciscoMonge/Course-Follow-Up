import Navbar from "../../shared/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Agregar_Planificador() {
    const navigate = useNavigate();
    const planificadoresExistentes = ["Planificador 2021", "Planificador 2022", "Planificador 2023"];
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
        navigate('/AgregarGrupo',{});
        } else {
        //alert(`Planificador seleccionado: ${planificador}`);
        navigate('/AgregarGrupo',{});
        }
    };

    const handleBack = () =>{
        navigate('/MainPage',{});
    };

    return (
        <div>
        <Navbar />
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="card m-4 text-center" style={{ width: '800px' }}>
            <div className="card-header">
                <h2>Agrega o Selecciona un Planificador</h2>
            </div>
            <div className="card-body">
                <div className="m-3">
                <label>Selecciona un planificador existente:</label>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Planificador</th>
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
                <label className="me-2">Crea un nuevo Planificador:</label>
                <input 
                    type="number" 
                    className="form-control m-2" 
                    style={{ width: '200px' }} 
                    min="2024" 
                    onInput={(e) => {
                        const inputValue = parseInt(e.target.value);
                        if (isNaN(inputValue) || inputValue < 2024) {
                            e.target.value = '';
                        } else {
                            e.target.value = inputValue.toString().slice(0, 4);
                        }
                    }} 
                    placeholder="Seleccione el año" 
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

export default Agregar_Planificador;