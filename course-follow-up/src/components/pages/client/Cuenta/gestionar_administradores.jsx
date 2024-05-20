import Navbar from "../../shared/navbar";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function GestionarAdministradores () {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('Buscando:', searchTerm);
    };

    const handleBack = () =>{
        navigate('/MiCuenta');
    };

    const users = [
        { nombre: 'Mariana', apellido: 'Fernández', correo: 'mariana.ferdez@example.com' },
        { nombre: 'Juan', apellido: 'Gómez', correo: 'juan.gomez@example.com' },
        { nombre: 'Ana', apellido: 'Martínez', correo: 'ana.martinez@example.com' },
    ];
    

    return(
        <div>
            <Navbar/>           
        <div style={{ marginTop: '100px'}}>
            <h1 style={{ color: 'white'}} >Gestionar Administradores</h1>

            <div className="d-flex align-items-center">
                <input 
                type="search" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={handleChange} 
                className="form-control m-2" 
                />
                <button className="btn btn-primary" 
                style={{ marginTop: '15px'}}
                onClick={handleSearch}>Buscar</button>

                <button className="btn btn-back" 
                style={ { marginTop: '15px', marginLeft: '10px'}}
                onClick={handleBack}>Volver</button>
            </div>

            <div className="container">
                
                <div className="left">
                    <ul className="user-list">
                        {users.map((user, index) => (
                            <li key={index} className="user-item">
                                <div className="container">
                                    <div>
                                        <h5>{user.nombre} {user.apellido}</h5>
                                        <p>{user.correo}</p>
                                    </div>

                                    <div>
                                        <input type="checkbox"
                                        className="custom-checkbox"
                                        ></input>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="right">
                    <h2>Indicar permisos: </h2>
                    <div className="actions">
                        <div>
                            <input type="checkbox" id="checkbox1"/>
                            <label htmlFor="checkbox1">Agregar Planificación</label>
                        </div>

                        <div>
                            <input type="checkbox" id="checkbox2"/>
                            <label htmlFor="checkbox2">Modificar Planificación</label>
                        </div>

                        <div>
                            <input type="checkbox" id="checkbox3"/>
                            <label htmlFor="checkbox3">Permisos Administrador</label>
                        </div>

                        <div>
                            <button className="btn btn-danger">Deshabilitar Cuenta</button>
                        </div>
                </div>

            </div>
        </div>

           
        </div>

    </div>
    );
}

export default GestionarAdministradores;