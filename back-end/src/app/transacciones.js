const connection = require('../config/configDB');

module.exports = (app) => { 
    app.post('/transaccion/tarjeta', (req, res) => {
        connection.query(`CALL process_transaction_card("${req.body.num_tarjeta}", "${req.body.num_cuenta_destino}", "Tarjeta", "${req.body.origen}", "${req.body.tipo_transaccion}", 
            "${req.body.monto}", "${req.body.descripcion}", "2", "1")`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 500, body: "" + error, error: true});
            }
            else {
                return res.json({status: 201, body: "¡Transacción realizada con exito!", error: false});
            }
        });
    });

    app.post('/transaccion/cuenta', (req, res) => {
        connection.query(`CALL process_transaction_account("${req.body.num_cuenta_destino}", "${req.body.num_cuenta_origen}", "${req.body.tipo_transaccion}", "${req.body.monto}", 
            "Cuenta", "${req.body.nombre_origen}", "${req.body.descripcion}", "2", "1")`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 500, body: "" + error, error: true});
            }
            else {
                return res.json({status: 201, body: "¡Transacción realizada con exito!", error: false});
            }
        });
    });

    app.post('/movimientosTransacciones', (req, res) => {
        connection.query(`SELECT descripcion, fecha_transaccion, c.num_cuenta, operacion, monto, origen, producto FROM transacciones t
            JOIN operaciones_bancarias o ON t.id_operacion = o.id_operacion
            LEFT JOIN cuentas c ON t.id_cuenta_destino = c.id_cuenta 
            WHERE t.id_cuenta = "${req.body.id_cuenta}"`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                return res.json({status: 0, mensaje: "Datos de transacciones no encontrados."});
            }
            else {
                return res.json({status: 1, mensaje: "Datos de transacciones encontrados.", data: rows});
            }
        });
    });
}