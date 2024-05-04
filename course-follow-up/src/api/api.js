const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const db = require('./db');
const app = express();
const port = 3001;

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(bodyParser.json());

// Importa la biblioteca dotenv
require('dotenv').config({ path: './claves_en_des.env' });

// Accede a la clave desde las variables de entorno
const claveAleatoria = process.env.CLAVE_ALEATORIA;
const correoMap = {}; // Diccionario para la gestión de correos

// Ahora puedes utilizar la clave en tu aplicación
console.log('Clave aleatoria:', claveAleatoria);


// Función para encriptar datos
function encryptData(data) {
  return CryptoJS.AES.encrypt(data, claveAleatoria).toString();
}

// Función para desencriptar datos
function decryptData(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, claveAleatoria);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Define la función que utiliza await dentro de una función asíncrona
async function obtenerUsuarios() {
  try {
      const [usuarios] = await db.query("SELECT * FROM coursefollowup.usuario");

      // Llenar el diccionario con los correos electrónicos desencriptados y encriptados
      usuarios.forEach(usuario => {
        const correoDesencriptado = decryptData(usuario.correo)
        correoMap[correoDesencriptado] = usuario.correo;
      });
      
      console.log("MAPEO", correoMap);
  } catch (error) {
      console.error('Error al obtener usuarios:', error);  
  }
}

// Llama a la función asíncrona
obtenerUsuarios();

// -------------------------------------------- FUNCIONALIDADES DE CRUD BD --------------------------------------------------------------

// Ruta para obtener todos los usuarios
app.get('/usuarios', async(req, res) =>{
    try{  
      // Obtener usuarios de la base de datos
      const [usuarios] = await db.query("SELECT * FROM coursefollowup.usuario");
      
      const usuariosDesencriptados = usuarios.map(usuario => ({
        id: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: decryptData(usuario.correo),
        contraseña: decryptData(usuario.contraseña),
        admin: usuario.admin
      }));

      console.log("Lista de Usuarios", usuariosDesencriptados);

      res.json(usuariosDesencriptados);
    } catch(error){
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    try {
      const { name, lastName, correo, psswrd } = req.body;

      // Encriptar los datos sensibles antes de almacenarlos en la base de datos
      const correoEncriptado = encryptData(correo); 
      const psswrdEncriptado = encryptData(psswrd);
             
      // Agregar usuario a la base de datos
      const result = await db.query("INSERT INTO coursefollowup.usuario (nombre, apellidos, correo, contraseña) VALUES (?, ?, ?, ?)", [name, lastName, correoEncriptado, psswrdEncriptado]);
  
      // Actualizar el diccionario correoMap con el nuevo usuario registrado
      correoMap[correo] = correoEncriptado;

      res.status(201).json({ mensaje: 'Usuario agregado correctamente', resultado: result });
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      res.status(500).json({ error: 'Error al agregar usuario' });
    }
  });

//Ruta para obtener todos los grupos
app.get('/grupos', async(req, res) =>{
  try{
      const [grupos] = await db.query("SELECT * FROM coursefollowup.grupo");
      res.json(grupos);
  } catch(error){
      console.error('Error al obtener grupos:', error);
      res.status(500).json({ error: 'Error al obtener grupos' });
  }
});

// Ruta para agregar un nuevo grupo
app.post('/grupos', async (req, res) => {
  try {
      const { numero, horario } = req.body;
      
      // Insertar el nuevo grupo en la base de datos
      const result = await db.query("INSERT INTO coursefollowup.grupo (numero, horario) VALUES (?, ?)", [numero, horario]);
      
      // Obtener el ID del grupo insertado
      const idGrupoResult = await db.query("SELECT LAST_INSERT_ID() AS idGrupo");
      // idGrupo = idGrupoResult[0].idGrupo;

      // Devolver el ID del grupo insertado
      res.status(201).json({ mensaje: 'Grupo agregado correctamente', idGrupoResult });
  } catch (error) {
      console.error('Error al agregar grupo:', error);
      res.status(500).json({ error: 'Error al agregar grupo' });
  }
});

// Ruta para obtner los cursos por idGrupo
app.get('/cursos/:idGrupo', async(req, res) =>{
  const idGrupo = req.params.idGrupo;
  try{
      const [cursos] = await db.query("CALL GetCursosxGrupo(?)", [idGrupo]);
      res.json(cursos);

  } catch(error){
      console.error('Error al obtener cursos:', error);
      res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// Ruta para agregar un nuevo curso a un grupo
app.post('/actualizarCursos', async (req, res) => {
  try {
      const { idGrupo, idCurso, fechaInicio, fechaFinal, profesor, horario } = req.body;
      console.log("ID GRUPO que va a la BD: ", idGrupo);
      console.log("ID CURSO que va a la BD: ", idCurso);
      console.log(typeof fechaFinal); // Debería imprimir 'string'
      const formatoEsperado = /^\d{4}-\d{2}-\d{2}$/;
      if(!formatoEsperado.test(fechaInicio)){
        console.log("formatear fecha inicio")
        const fechaInicioFormateada = fechaInicio.split('-').reverse().join('-'); // Convertir a "YYYY-MM-DD"
      }
      if(!formatoEsperado.test(fechaFinal)){
        console.log("formatear fecha final")
        const fechaFinalFormateada = fechaFinal.split('-').reverse().join('-');// Convertir a "YYYY-MM-DD"
      }

      const result = await db.query("CALL updateCursoGrupo(?,?,?,?,?,?)", [idGrupo, idCurso, fechaInicio, fechaFinal, profesor, horario]);
    res.status(201).json({ mensaje: 'Curso actualizado correctamente', resultado: result });
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ error: 'Error al agregar curso' });
  }
});


// Ruta para obtener cursos filtrados por fecha
app.get('/cursosXFecha', async (req, res) => {
  try {
    const { fechaInicio, fechaFinal } = req.query;

    const [cursos] = await db.query(`
      SELECT gxc.idgrupoXcurso, g.idgrupo ,g.numero AS grupoNumero, g.horario AS grupoHorario, c.idcurso, c.nombre AS cursoNombre, gxc.fechaInicio, gxc.fechaFinal, gxc.profesor, gxc.horario AS cursoHorario
      FROM grupoXcurso gxc
      JOIN grupo g ON gxc.idgrupo = g.idgrupo
      JOIN curso c ON gxc.idcurso = c.idcurso
      WHERE gxc.fechaInicio >= ? AND gxc.fechaFinal <= ?
    `, [fechaInicio, fechaFinal]);

    res.json(cursos);
  } catch (error) {
    console.error('Error al obtener cursos por fecha:', error);
    res.status(500).json({ error: 'Error al obtener cursos por fecha' });
  }
});


// Ruta para obtener grupos filtrados por fecha
// Para la tabla de grupos a fusionar
app.get('/gruposXFecha', async (req, res) => {
  try {
    const { fechaInicio, fechaFinal, idGrupo } = req.query;

    const [cursos] = await db.query(`
      SELECT gxc.idgrupoXcurso ,g.numero AS grupoNumero
      FROM grupoXcurso gxc
      JOIN grupo g ON gxc.idgrupo = g.idgrupo
      WHERE gxc.fechaInicio >= ? AND gxc.fechaFinal <= ? AND gxc.idgrupo != ?
    `, [fechaInicio, fechaFinal, idGrupo]);

    res.json(cursos);
  } catch (error) {
    console.error('Error al obtener cursos por fecha:', error);
    res.status(500).json({ error: 'Error al obtener cursos por fecha' });
  }
});


// Ruta para enviar correos de recuperación de contraseña
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'coursefollowupoficial@gmail.com',
    pass: 'mhxguhxlwvbgyede'
  }
});

app.post('/sendEmail', (req, res) => {
  console.log("ENTRO AL API")
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: 'coursefollowupoficial@gmail.com',
    to,
    subject,
    text: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.send('Correo electrónico enviado con éxito');
    }
  });
});

// Ruta para recuperar contraseña de usuario
app.put('/usuarios/updatePassword', async (req, res) => {
  console.log("CAMBIAR CONTRASEÑA API");
  try {
    const { correo, nuevaContraseña } = req.body;
    
    // Buscar el correo desencriptado en el diccionario y obtener su forma encriptada correspondiente
    const correoEncriptado = correoMap[correo];

    if (correoEncriptado) {
        // Si se encuentra el correo buscado desencriptado, puedes usar su forma encriptada
        console.log('Correo desencriptado encontrado:', correo);
        console.log('Correo encriptado correspondiente:', correoEncriptado);

        const psswrdEncriptado = encryptData(nuevaContraseña);

        // Actualiza la contraseña encriptada en la base de datos para el usuario correspondiente
        const result = await db.query("UPDATE coursefollowup.usuario SET contraseña = ? WHERE correo = ?", [psswrdEncriptado, correoEncriptado]);

        if (result.affectedRows === 0) {
          res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
          res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
        }

    } else {
        // Si el correo buscado desencriptado no se encuentra en el diccionario
        console.log('Correo desencriptado no encontrado');
    }

  } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
