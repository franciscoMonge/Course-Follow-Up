import Navbar from "../../shared/navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function EditarCuenta () {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleBack = () =>{
        navigate('/MiCuenta');
    };

    return(
        <div>
            <Navbar/>           
        <div style={{ marginTop: '80px'}}>
            <h1 style={{ color: 'white'}} >Editar Cuenta</h1>
            <div className="card m-4 p-4" style={{ textAlign: 'center', width: '600px'}}>

                <div className="form-group">
                    <label style={{ fontSize: 'larger'}} >Nombre: </label>
                        <input 
                            type= 'text'
                            className="form-control m-2" 
                        />
                </div>

                <div className="form-group">
                    <br/>
                    <label style={{ fontSize: 'larger'}} >Apellido: </label>
                        <input 
                            type= 'text'
                            className="form-control m-2"
                        />
                </div>

                <div className="form-group">
                    <br/>
                    <label style={{ fontSize: 'larger'}}>Dirección de correo: </label>
                        <input 
                            type= 'text'
                            className="form-control m-2" 
                            value= 'marianafdmz@estudiantec.cr'
                            readOnly
                        />
                </div>

                <div className="form-group">
                            <br/>
                            <label style={{ fontSize: 'larger'}}>Contraseña: </label>
                            <input 
                                type= {showPassword ? "text" : "password"} 
                                className="form-control m-2" 
                                value= '1234'
                            />
                            <button 
                                type="button" 
                                className="btn position-absolute end-0 top-50 translate-middle-y"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ marginRight: "15px", marginTop: '125px' }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                </div>

                <div className="form-group">
                            <br/>
                            <label style={{ fontSize: 'larger'}}>Confirmar Contraseña: </label>
                            <input 
                                type= {showPassword ? "text" : "password"} 
                                className="form-control m-2" 
                                value= '1234'
                            />
                            <button 
                                type="button" 
                                className="btn position-absolute end-0 top-50 translate-middle-y"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ marginRight: "15px", marginTop: '228px' }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                </div>
            </div>
            
            <div  style={{ textAlign: 'center' }}>
                <button className="btn btn-primary">Confirmar Cambios</button>
                <br />
                <button className="btn btn-back" onClick={handleBack}>Volver</button>
            </div>
           
        </div>

    </div>
    );
}

export default EditarCuenta;