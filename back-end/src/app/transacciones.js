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
        connection.query(`CALL process_transaction_account("${req.body.num_cuenta_origen}", "${req.body.num_cuenta_destino}", ${req.body.tipo_transaccion}, ${req.body.monto}, 
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
        // Muestra unicamente los debitos correspondientes
        // connection.query(`SELECT t.descripcion, t.fecha_transaccion, cd.num_cuenta, o.operacion, t.monto, t.origen, t.producto FROM transacciones t
        //     LEFT JOIN cuentas co ON co.id_cuenta = t.id_cuenta 
        //     LEFT JOIN cuentas cd ON cd.id_cuenta = t.id_cuenta_destino 
        //     JOIN operaciones_bancarias o ON t.id_operacion = o.id_operacion 
        //     WHERE co.id_cliente = cd.id_cliente AND t.id_cliente = "${req.body.id_cliente}" AND t.monto < 0 
        //     AND (t.id_cuenta = "${req.body.id_cuenta}") 
        //     ORDER BY fecha_transaccion DESC`, (error, rows, columns) => {

        // Muestra unicamente los creditos correspondientes
        // connection.query(`SELECT t.descripcion, t.fecha_transaccion, cd.num_cuenta, o.operacion, t.monto, t.origen, t.producto FROM transacciones t
        //     LEFT JOIN cuentas co ON co.id_cuenta = t.id_cuenta 
        //     LEFT JOIN cuentas cd ON cd.id_cuenta = t.id_cuenta_destino 
        //     JOIN operaciones_bancarias o ON t.id_operacion = o.id_operacion 
        //     WHERE co.id_cliente = cd.id_cliente AND t.id_cliente = "${req.body.id_cliente}" AND t.monto > 0 
        //     AND (t.id_cuenta_destino = "${req.body.id_cuenta}") 
        //     ORDER BY fecha_transaccion DESC`, (error, rows, columns) => {

        // Muestra todo correctamente de la cuenta origen, pero no de la cuenta destino
        // connection.query(`SELECT t.descripcion, t.fecha_transaccion, cd.num_cuenta, o.operacion, t.monto, t.origen, t.producto FROM transacciones t
        //     LEFT JOIN cuentas co ON co.id_cuenta = t.id_cuenta 
        //     LEFT JOIN cuentas cd ON cd.id_cuenta = t.id_cuenta_destino 
        //     JOIN operaciones_bancarias o ON t.id_operacion = o.id_operacion 
        //     WHERE t.id_cliente = "${req.body.id_cliente}" AND (t.id_cuenta = "${req.body.id_cuenta}" OR t.id_cuenta_destino = "${req.body.id_cuenta}" OR t.id_tarjeta = "${req.body.id_tarjeta}")
        //     AND (co.id_cliente = cd.id_cliente AND t.id_transaccion NOT IN(SELECT t2.id_transaccion FROM transacciones t2 
        //                                     LEFT JOIN cuentas co2 ON co2.id_cuenta = t2.id_cuenta
        //                                     LEFT JOIN cuentas cd2 ON cd2.id_cuenta = t2.id_cuenta_destino
        //                                     WHERE co2.id_cliente = cd2.id_cliente AND t2.id_cuenta = "${req.body.id_cuenta}" AND t2.monto > 0)
        
        //         OR (co.id_cliente != cd.id_cliente AND t.id_transaccion NOT IN(SELECT t3.id_transaccion FROM transacciones t3 
        //                                     LEFT JOIN cuentas co3 ON co3.id_cuenta = t3.id_cuenta
        //                                     LEFT JOIN cuentas cd3 ON cd3.id_cuenta = t3.id_cuenta_destino
        //                                     WHERE co3.id_cliente = cd3.id_cliente AND t3.id_cuenta = "${req.body.id_cuenta}" AND t3.monto < 0)))
        //     ORDER BY fecha_transaccion DESC`, (error, rows, columns) => {

        connection.query(`SELECT t.descripcion, t.fecha_transaccion, cd.num_cuenta, o.operacion, t.monto, t.origen, t.producto FROM transacciones t
            LEFT JOIN cuentas co ON co.id_cuenta = t.id_cuenta 
            LEFT JOIN cuentas cd ON cd.id_cuenta = t.id_cuenta_destino 
            JOIN operaciones_bancarias o ON t.id_operacion = o.id_operacion 
            WHERE t.id_cliente = "${req.body.id_cliente}" AND (t.id_cuenta = "${req.body.id_cuenta}" OR t.id_cuenta_destino = "${req.body.id_cuenta}" OR t.id_tarjeta = "${req.body.id_tarjeta}")
            AND (t.id_transaccion NOT IN(SELECT t2.id_transaccion FROM transacciones t2 
                                            LEFT JOIN cuentas co2 ON co2.id_cuenta = t2.id_cuenta
                                            LEFT JOIN cuentas cd2 ON cd2.id_cuenta = t2.id_cuenta_destino
                                            WHERE co2.id_cliente = cd2.id_cliente AND t2.id_cuenta = "${req.body.id_cuenta}" AND t2.monto > 0))
            ORDER BY fecha_transaccion DESC`, (error, rows, columns) => {
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