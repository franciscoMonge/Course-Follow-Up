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

//Obtener TODOS los cursos (13 disponibles)
app.get('/cursos', (req, res) => {
  connection.query('CALL GetCursos()', (error, results) => {
    if (error) throw error;
    res.json(results[0]); // Los resultados están en la primera posición del arreglo results
  });
});

//Obtener los cursos por grupo (Si no hay cursos para ese grupo, agarra lo de la tabla de Cursos)
app.get('/cursos/:numero', (req, res) => {
  const numeroGrupo = req.params.numero;
  connection.query('CALL GetCursosxGrupo(?)', [numeroGrupo], (error, results) => {
    if (error) throw error;
    res.json(results[0]); // Los resultados están en la primera posición del arreglo results
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
