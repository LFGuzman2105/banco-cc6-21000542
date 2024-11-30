const mysql = require('mysql');
const connection = mysql.createConnection({ 
    host: '34.70.107.153',
    user: 'root',
    password: 'pokemon12',
    database: 'bancocc6'
});

connection.connect((error) => {
    if (error) {
        console.error('El error de conexión es: ' + error);
    }
    console.log('¡Conectado a la base de datos MySQL!');
});

module.exports = connection;