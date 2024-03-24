const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3001;

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(bodyParser.json());

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


// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
