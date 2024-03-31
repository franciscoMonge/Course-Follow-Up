const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Ruta para obtener todas las actas
app.get('/usuarios', async(req, res) =>{
    try{
        const [usuarios] = await db.query("SELECT * FROM coursefollowup.usuario");
        res.json(usuarios);
    } catch(error){
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { name, lastName, correo, psswrd } = req.body;
      const result = await db.query("INSERT INTO coursefollowup.usuario (nombre, apellidos, correo, contraseña) VALUES (?, ?, ?, ?)", [name, lastName, correo, psswrd]);
  
  
      res.status(201).json({ mensaje: 'Usuario agregado correctamente', resultado: result });
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      res.status(500).json({ error: 'Error al agregar usuario' });
    }
  });

// Ruta para obtener TODOS los grupos
app.get('/grupos', async(req, res) =>{
  try{
      const [grupos] = await db.query("CALL getGrupos()");
      res.json(grupos);
  } catch(error){
      console.error('Error al obtener grupos:', error);
      res.status(500).json({ error: 'Error al obtener grupos' });
  }
});

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

//Obtiene el horario de un grupo específico
app.get('/horario/:grupo', async(req, res) =>{
  const idGrupo = req.params.grupo;
  try{
      const [horario] = await db.query("CALL getHorarioGrupo(?)", [idGrupo]);
      res.json(horario);
  } catch(error){
      console.error('Error al obtener horario:', error);
      res.status(500).json({ error: 'Error al obtener horario' });
  }
});

// Ruta para agregar un nuevo usuario
app.post('/actualizarCursos', async (req, res) => {
  try {
      const { idGrupo, idCurso, fechaInicio, fechaFinal, profesor, horario } = req.body;
      console.log("ID GRUPO que va a la BD: ", idGrupo);
      console.log("ID CURSO que va a la BD: ", idCurso);
      const result = await db.query("CALL updateCursoGrupo(?,?,?,?,?,?)", [idGrupo, idCurso, fechaInicio, fechaFinal, profesor, horario]);
    res.status(201).json({ mensaje: 'Curso actualizado correctamente', resultado: result });
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ error: 'Error al agregar curso' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
