const { v4: uuidv4 } = require('uuid');
const connection = require('../config/configDB');

function generarNumeroCuenta() {
    let numero = '';

    while (numero.length < 13) {
      const aleatorio = Math.floor(Math.random() * 10**10).toString();
      numero += aleatorio;
    }

    return numero.slice(0, 13);
}

module.exports = (app) => {
    app.post('/getCuentaDestino', (req, res) => {
        connection.query(`SELECT id_cuenta AS id_cuenta_destino, descripcion AS tipo_cuenta, nombre1, nombre2, apellido1, apellido2 FROM cuentas c, tipo_cuenta tc, clientes cl 
            WHERE c.id_tipo_cuenta = tc.id_tipo_cuenta AND c.id_cliente = cl.id_cliente AND c.num_cuenta = "${req.body.num_cuenta}"`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                return res.json({status: 0, mensaje: "Cuenta a Acreditar no Encontrada."});
            }
            else {
                return res.json({status: 1, mensaje: "Datos de cuenta destino obtenidos.", data: rows});
            }
        });
    });

    app.post('/cuentas', (req, res) => {
        connection.query(`SELECT id_cuenta, num_cuenta, saldo, descripcion FROM cuentas c, tipo_cuenta tc 
            WHERE c.id_tipo_cuenta = tc.id_tipo_cuenta AND c.id_cliente = "${req.body.id_cliente}"`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                return res.json({status: 0, mensaje: "Datos de cuentas no encontrados."});
            }
            else {
                return res.json({status: 1, mensaje: "Datos de cuentas del cliente obtenidos.", data: rows});
            }
        });
    });

    app.post('/cuentaMovimiento', (req, res) => {
        connection.query(`SELECT num_cuenta, saldo, descripcion FROM cuentas c, tipo_cuenta tc 
            WHERE c.id_tipo_cuenta = tc.id_tipo_cuenta AND c.id_cuenta = "${req.body.id_cuenta}"`, (error, rows, columns) => {
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

    app.post('/solicitarCuenta', (req, res) => {
        connection.query(`SELECT COUNT(*) as n_cuentas FROM cuentas WHERE id_cliente = "${req.body.id_cliente}"`, (error, rows, columns) => {
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error });
            }
            else if (rows[0].n_cuentas >= 6) {
                res.json({status: 0, mensaje: "El cliente ya no puede solicitar mas cuentas, ya ha llegado al limite de 6."});
            }
            else {
                let id_cuenta = uuidv4();
                let num_cuenta = generarNumeroCuenta();

                connection.query(`INSERT INTO cuentas VALUES("${id_cuenta}", "${num_cuenta}", "${req.body.id_tipo_cuenta}", 1, 0.00, NOW(), 
                                                            "${req.body.id_cliente}", 1)`, (error, rows, columns) => {
                    if (error) {
                        return res.json({status: 0, mensaje: "Error en el servidor. " + error });
                    }
                    else {
                        return res.json({status: 1, mensaje: "Cuenta registrada correctamente.", num_cuenta: num_cuenta});
                    }
                });
            }
        });
    });
}