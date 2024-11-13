const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require('../config/configDB');

module.exports = (app) => { 
    app.post('/login', (req, res) => {

        connection.query(`SELECT user_id, id_cliente, password, role_id FROM usuarios 
        WHERE username = "${req.body.username}"`, async (error, rows, columns) => {
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                return res.json({status: 0, mensaje: "Usuario o contraseña incorrectos."});
            }
            else {
                const isValidPassword = await bcrypt.compare(req.body.password, rows[0].password);

                if (!isValidPassword) {
                    return res.json({status: 0, mensaje: "Usuario o contraseña incorrectos."});
                }
                else {
                    const token = jwt.sign({username: req.body.username}, 'secretkey', {expiresIn: '1h'});
                    return res.json({status: 1, mensaje: "Usuario logueado correctamente.", token: token, id_cliente: rows[0].id_cliente, role_id: rows[0].role_id});
                }
            }
        });
    });
}