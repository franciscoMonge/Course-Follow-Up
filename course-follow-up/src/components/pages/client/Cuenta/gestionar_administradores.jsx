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
        // Aquí puedes manejar la búsqueda, por ejemplo, haciendo una solicitud a un servidor
        console.log('Buscando:', searchTerm);
    };

    const handleBack = () =>{
        navigate('/MiCuenta');
    };

    return(
        <div>
            <Navbar/>           
        <div style={{ marginTop: '80px'}}>
            <h1 style={{ color: 'white'}} >Gestionar Administradores</h1>

            <div>
                <input 
                type="search" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={handleChange} 
            />
            <button onClick={handleSearch}>Buscar</button>
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

export default GestionarAdministradores;