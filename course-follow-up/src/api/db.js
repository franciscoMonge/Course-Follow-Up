const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coursefollowup',
    port: '3306'
});


const promiseConnection = connection.promise();

promiseConnection.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = promiseConnection;

/*connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;*/