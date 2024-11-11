const connection = require('../config/configDB');

module.exports = (app) => { 
    app.post('/cuentas', (req, res) => {
        connection.query(`SELECT id_cuenta, num_cuenta, saldo, descripcion FROM cuentas c, tipo_cuenta tc WHERE c.id_tipo_cuenta = tc.id_tipo_cuenta AND c.id_cliente = "${req.body.id_cliente}"`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                return res.json({status: 0, mensaje: "Datos de cuenta no encontrados."});
            }
            else {
                return res.json({status: 1, mensaje: "Datos de cuenta del cliente obtenidos.", data: rows});
            }
        });
    });
}