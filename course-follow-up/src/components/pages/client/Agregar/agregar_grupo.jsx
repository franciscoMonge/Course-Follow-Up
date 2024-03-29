import Navbar from "../../shared/navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Agregar_Grupo() {

    const navigate = useNavigate();
    const gruposExistentes = ["1", "2", "3"];
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
    const [grupo, setGrupo] = useState(""); // Estado para almacenar el nombre del grupo seleccionado
    const { planificador } = useLocation().state; // Obtener el planificador seleccionado de la ruta anterior

    const handleCheckboxChange = (index) => {
        if (grupoSeleccionado === index) {
            setGrupoSeleccionado(null);
            setGrupo(""); // Limpiar el estado grupo
        } else {
            setGrupoSeleccionado(index);
            setGrupo(gruposExistentes[index]); // Establecer el nombre del grupo seleccionado
        }
    };

    const handleContinuar = () => {
        if (grupo === "") {
            alert("Debe seleccionar un grupo existente");
        } else {
            navigate('/AgregarCursos', { state: { planificador, grupo } }); // Pasar el nombre del grupo seleccionado
        }
    };

    const handleBack = () =>{
        navigate('/Agregargrupo',{});
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
                                            <td>{grupoExistente}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={grupoSeleccionado === index}
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
