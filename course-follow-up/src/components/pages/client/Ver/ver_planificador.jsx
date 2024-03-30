import Navbar from "../../shared/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Ver_Planificador() {
    const navigate = useNavigate();
    
    const [nuevoPlanificador, setNuevoPlanificador] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");

    const [showError, setShowError] = useState(false);


    const handleContinuar = () => {
        if (nuevoPlanificador === "") {
            alert("No ha seleccionado o creado un planificador, por favor intentelo de nuevo.");
        }
        else {
        alert( `Planificador seleccionado: ${planificador} o Planificador creado: ${nuevoPlanificador}`);
        //navigate('/AgregarGrupo',{});
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
                <h2>Selecciona un año para ver el planificador</h2>
            </div>
            <div className="card-body">
                <div className="form-group d-flex align-items-center">
                <label className="me-2">Selecciona un año:</label>
                <input 
                    type="number" 
                    className="form-control m-2" 
                    style={{ width: '200px' }} 
                    min="2024" 
                    onInput={(e) => {
                        const inputValue = parseInt(e.target.value);
                        if (isNaN(inputValue) || inputValue < 2024) {
                            setNuevoPlanificador(""); // Establecer el estado como vacío si la entrada no es válida
                        } else {
                            setNuevoPlanificador(inputValue.toString().slice(0, 4)); // Establecer el estado con el valor válido
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

export default Ver_Planificador;