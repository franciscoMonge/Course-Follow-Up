import Navbar from "../../shared/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function MiCuenta () {
    const navigate = useNavigate();

    const handleBack = () =>{
        navigate('/MainPage');
    };

    return(
        <div>
            <Navbar/>           
        <div style={{ marginTop: '100px'}}>
            <h1 style={{ color: 'white'}} >Mi Cuenta</h1>
            <div className="card m-4 p-4" style={{ textAlign: 'left'}}>
                <br />
                <h5>Nombre: Mariana</h5>
                <br />
                <h5>Apellido: Fernández </h5>
                <br />
                <h5>Dirección de correo: marianafdzm@estudiantec.cr </h5>
                <br />
                <h5>Contraseña: <input type='password' value='1234' readOnly style={{ backgroundColor: 'transparent', color: 'black'}}/></h5>

                <div style={{ textAlign: 'right'}}>
                    <button className="btn-link" style={{ backgroundColor: '#092D4E'}}>
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    </button>
                </div>
            </div>
            
            <div  style={{ textAlign: 'left' }}>
                <button className="btn btn-primary">Gestionar Administradores</button>
                <br />
                <button className="btn btn-danger">Eliminar Cuenta</button>
                <br />
                <button className="btn btn-back" onClick={handleBack}>Volver</button>
            </div>
           
        </div>

    </div>
    );
}

export default MiCuenta;