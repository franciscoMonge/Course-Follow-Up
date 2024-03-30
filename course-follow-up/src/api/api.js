const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Ruta para obtener todos los usuarios
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


// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
