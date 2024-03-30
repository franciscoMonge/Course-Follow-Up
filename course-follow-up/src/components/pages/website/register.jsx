import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../shared/navbar";
import axios from 'axios';

function Signup () {
    const navigate = useNavigate();

    //Datos de Registro
    const [usuarios, setUsuarios] = useState([]);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [correo, setCorreo] = useState("");
    const [psswrd, setPsswrd] = useState("");
    const [confirmPsswrd, setconfirmPsswrd] = useState("");
    const [showError, setShowError] = useState(false);


    // Carga todas las actas de la BD en la lista "actas" 
    useEffect(() =>{
        axios.get('http://localhost:3001/usuarios')
        .then(response =>{
            console.log('nuevo EFFECT2222');
            setUsuarios(response.data);
            //console.log('ok: ',usuarios[0].nombre)
        })
        .catch(error => {
            console.log('ERROR: Carga Fallida de usuarios', error);
        });
    }, []);

    useEffect(() => {
        // Este se ejecuta cuando actas cambie
        console.log('usuarios actualizados:', usuarios[0]);
        //console.log('keywords: ', actas[0].palabras_clave)
    }, [usuarios]);
    
    const handleBack = () => {
        navigate('/',{});
    }

    const handleRegister = async () => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo);

        if(!name || !lastName || !correo || !psswrd || !confirmPsswrd){
            setShowError(true);
        }
        else if (usuarioEncontrado) {
            //Ya existe un usuario con este correo
            setShowError(true);
            console.log("Registro fallido");
        }
        else if(psswrd !== confirmPsswrd){
            setShowError(true);
        console.log("Contraseñas incorrectas");
        }
        else{
            const datos = {
                name,
                lastName,
                correo,
                psswrd
            };
    
            try{
                // console.log('revisarrrrrr ',datos)
                const response = await axios.post('http://localhost:3001/usuarios', datos);
                console.log(response.data);
                alert("Usuario registrado exitosamente.");
                navigate('/MainPage',{});
            }
            catch(err){
                alert("Error al subir el usuario: ", err);
            }
        }
    };

    return(
        <div>
            <div className="mb-5">
                <Navbar/>
            </div>
            <div className="container d-flex flex-column align-items-center justify-content-center  mt-5 vh-auto">
                <h1 className="mb-2">Course Follow-Up</h1>
                <div className="card m-4 text-center" style={{ width: '500px', overflowY: 'auto'}}>
                    <div className="card-header">
                        <h2>Crear Cuenta</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                type="text" 
                                className="form-control m-2" 
                                onChange={(event)=>{setName(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input 
                                type="text" 
                                className="form-control m-2" 
                                onChange={(event)=>{setLastName(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Dirección de correo electrónico:</label>
                            <input 
                                type="text" 
                                className="form-control m-2"  
                                placeholder="Ej: juanperez@estudiantec.cr / @itcr.ac.cr"
                                onChange={(event)=>{setCorreo(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input 
                                type="password" 
                                className="form-control m-2" 
                                onChange={(event)=>{setPsswrd(event.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirmar Contraseña:</label>
                            <input 
                                type="password" 
                                className="form-control m-2"
                                onChange={(event)=>{setconfirmPsswrd(event.target.value)}}
                            />
                        </div>
                        <div className="m-3">
                            <hr />
                            <button className="btn btn-danger m-4" onClick={handleBack}>Volver</button>
                            <button className="btn btn-primary m-4" onClick={handleRegister}>Registrarse</button>
                        </div>
                    </div>
                </div>
                {showError && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Error de Inicio de Sesión</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowError(false)}></button>
                                </div>
                                <div className="modal-body">
                                    Los datos ingresados son inválidos o están vacíos. Por favor, completa todos los campos correctamente.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowError(false)}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;