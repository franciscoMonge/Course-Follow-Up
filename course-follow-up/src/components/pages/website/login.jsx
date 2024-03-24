import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/navbar";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import generarRandomPassword from "./generarPassword";

function Login () {
    const navigate = useNavigate();

    //Datos de Login
    const [usuarios, setUsuarios] = useState([]);
    const [correo, setCorreo] = useState('');
    const [psswrd, setPsswrd] = useState('');
    const [showError, setShowError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);


    // Carga todas las actas de la BD en la lista "actas" 
    useEffect(() =>{
        axios.get('http://localhost:3001/usuarios')
        .then(response =>{
            console.log('nuevo EFFECT');
            setUsuarios(response.data);
            //console.log('ok: ',usuarios[0].nombre)
        })
        .catch(error => {
            console.log('ERROR: Carga Fallida de usuarios', error);
        });
    }, []);

    useEffect(() => {
        // Este se ejecuta cuando actas cambie
        console.log('actas actualizadas:', usuarios[0]);
        //console.log('keywords: ', actas[0].palabras_clave)
    }, [usuarios]);



    const handleLogin = () =>{
        console.log('aqui: ', usuarios[0].admin.data[0]);
        console.log(correo);
        console.log(psswrd);

        if(!correo || !psswrd){
            setShowError(true);
        }
        else{
            const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo && usuario.contraseña === psswrd);

            if (usuarioEncontrado) {
                // El usuario y la contraseña coinciden
                navigate('/MainPage',{});
                console.log("Inicio de sesión exitoso");
            } else {
                // No se encontró el usuario o la contraseña es incorrecta
                setShowError(true);
                console.log("Inicio de sesión fallido");
            }
        }
    };

    const handleChangePassword = async () => {
        console.log("ENTRE A CAMBIAR LA PASSWORD")
        if(!correo){
            toast.info('Debe ingresar su correo.');
        }else{
            const correoEncontrado = usuarios.find(usuario => usuario.correo === correo);

            if(correoEncontrado){
                console.log("ENCONTRE EL CORREO")
                const nuevaPassword = generarRandomPassword(6);
                try {
                    await axios.post('http://localhost:3001/sendEmail', {
                      to: correo,
                      subject: 'Recuperación de Contraseña',
                      body: `Su nueva contraseña es: ${nuevaPassword}` 
                    });
                    toast.success('Se ha enviado un correo a su cuenta');
                  } catch (error) {
                    toast.error('Error al enviar correo', error);
                    console.error("Error", error);
                  }
            }else{
                toast.error('Correo inválido.');
            }
        }
    };

    return(
        <div>
            <Navbar/>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <h1 className="mb-4">Course Follow-Up</h1>
                <div className="card m-4 text-center" style={{ width: '500px'}}>
                    <div className="card-header">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
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
                        <div className="m-3">
                            <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
                            <hr />
                        </div>
                            <Link onClick={handleChangePassword}><span className="text-primary">¿Olvidaste la contraseña?</span></Link>
                             <ToastContainer position="top-center"/>
                            <br />
                            <Link to="/Register"><span className="text-primary">¿No tienes cuenta?</span></Link>
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

export default Login;