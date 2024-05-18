import Navbar from "../../shared/navbar";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function MiCuenta () {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleBack = () =>{
        navigate('/MainPage');
    };

    const handleEdit = () => {
        navigate('/EditarCuenta');
    };

    const handleAccount = () => {
        navigate('/GestionarAdministradores');
    };

    return(
        <div>
            <Navbar/>           
        <div style={{ marginTop: '80px'}}>
            <h1 style={{ color: 'white'}} >Mi Cuenta</h1>
            
            <div className="card m-4 p-4" style={{ textAlign: 'left'}}>
                
                <div className="form-group">
                    <br/>
                    <h5 style={{ display: 'inline'}}>Nombre: </h5>
                    <label style={{ display: 'inline', fontSize: 'larger'}}> Mariana</label>
                </div>
                
                <div className="form-group">
                    <br/>
                    <h5 style={{ display: 'inline'}}>Apellido: </h5>
                    <label style={{ display: 'inline', fontSize: 'larger'}}> Fernández</label>
                </div>
                
                <div className="form-group">
                    <br/>
                    <h5 style={{ display: 'inline'}}>Dirección de correo: </h5>
                    <label style={{ display: 'inline', fontSize: 'larger'}}> marianafdmz@estudiantec.cr</label>
                </div>
                
                <div className="form-group">
                    <br/>
                    <h5 >Contraseña: </h5>
                    <input
                        type= {showPassword ? "text" : "password"} 
                        className="form-control m-2" 
                        value= '123445'
                        readOnly
                    />
                    <button 
                        type="button" 
                        className="btn position-absolute end-0 top-50 translate-middle-y"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ marginRight: "15px", marginTop: '70px' }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>
                </div>

                <div style={{ textAlign: 'right'}}>
                    <br/>
                    <button className="btn-link" style={{ backgroundColor: '#092D4E'}} onClick={handleEdit}>
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    </button>
                </div>
            </div>
            
            <div  style={{ textAlign: 'center' }}>
                <button className="btn btn-primary" onClick={handleAccount}>Gestionar Administradores</button>
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