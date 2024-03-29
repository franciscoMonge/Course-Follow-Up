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


app.get('/cursos/:numero', async(req, res) =>{
  const numeroGrupo = req.params.numero;
  try{
      const [cursos] = await db.query("CALL GetCursosxGrupo(?)", [numeroGrupo]);
      res.json(cursos);
  } catch(error){
      console.error('Error al obtener cursos:', error);
      res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

//Obtiene el horario de un grupo específico
app.get('/horario/:grupo', async(req, res) =>{
  const numeroGrupo = req.params.grupo;
  try{
      const [horario] = await db.query("CALL getHorarioGrupo(?)", [numeroGrupo]);
      res.json(horario);
  } catch(error){
      console.error('Error al obtener horario:', error);
      res.status(500).json({ error: 'Error al obtener horario' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
