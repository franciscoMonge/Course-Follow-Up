import Navbar from "../../shared/navbar";
import { Link, useNavigate, useLocation} from "react-router-dom";

function Opciones () {
    const navigate = useNavigate();
    const location = useLocation();

    const grupoNumero = location?.state?.grupoNumero;
    const cursoNombre = location?.state?.cursoNombre;
    const fechaInicio = location.state.fechaInicio;
    const fechaFinal = location.state.fechaFinal;
    const añoPlanificador = location.state.añoPlanificador;

    const handleModificar = () => {
        alert('Modificar')
    };

    const handleIntercambiar = () => {
        alert('Intercambiar')
    };

    const handleFusionar = () =>{
        navigate('/FusionarGrupo',{state:{grupoNumero: grupoNumero, cursoNombre: cursoNombre, fechaInicio: fechaInicio, 
            fechaFinal: fechaFinal, añoPlanificador: añoPlanificador}});
    }

    const handleBack = () =>{
        navigate('/App',{state:{fechaInicio:fechaInicio, fechaFinal:fechaFinal, añoPlanificador: añoPlanificador}});
    }

    return(
        <div>
            <Navbar/>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <h1 className="mb-4">Course Follow-Up</h1>
                <div className="card m-4 text-center" style={{ width: '500px'}}>
                    <div className="card-header">
                        <h2>Opciones</h2>
                    </div>
                    <div className="card-body">
                        <div className="m-3">
                            <button className="btn btn-primary btn-lg" onClick={handleModificar}>Modificar Curso</button>
                        </div>
                        <div className="m-3">
                            <button className="btn btn-primary btn-lg" onClick={handleFusionar}>Fusionar Grupo</button>
                        </div>
                        <div className="m-3">
                            <button className="btn btn-primary btn-lg" onClick={handleIntercambiar}>Intercambiar Curso</button>
                        </div>
                        <div className="m-3">
                            <button className="btn btn-danger btn-lg" onClick={handleBack}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Opciones;