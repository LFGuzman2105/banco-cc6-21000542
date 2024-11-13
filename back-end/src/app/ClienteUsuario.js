const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
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
    app.post('/nombreCliente', (req, res) => {
        connection.query(`SELECT nombre1, nombre2, apellido1, apellido2 FROM clientes 
        WHERE id_cliente = "${req.body.id_cliente}"`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                res.json({status: 0, mensaje: "Cliente no encontrado."});
            }  
            else {
                res.json({status: 1, mensaje: "Cliente encontrado.", nombreCliente: rows[0].nombre1 + " " + rows[0].nombre2 + " " + rows[0].apellido1 + " " + rows[0].apellido2});
            }
        });
    });

    app.post('/registrarClienteUsuario', async (req, res) => {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        connection.query(`SELECT id_cliente FROM clientes WHERE dpi = "${req.body.dpi}"`, (error, rows, columns) => {
            if (error) {
                res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                connection.query(`SELECT user_id FROM usuarios WHERE username = "${req.body.username}"`, (error, rows, columns) => {
                    if (error) {
                        res.json({status: 0, mensaje: "Error en el servidor. " + error});
                    }
                    else if (rows.length == 0) {
                        let id_cliente = uuidv4();

                        connection.query(`INSERT INTO clientes VALUES("${id_cliente}", "${req.body.dpi}", "${req.body.nombre1}", "${req.body.nombre2}", "${req.body.nombre3}", "${req.body.apellido1}",
                                        "${req.body.apellido2}", "${req.body.apellido3}", "${req.body.fecha_nacimiento}", 1, NOW())`, (error, rows, columns) => {
                            if (error) {
                                res.json({status: 0, mensaje: "Error en el servidor. " + error });
                            }
                            else {
                                let user_id = uuidv4();

                                connection.query(`INSERT INTO usuarios VALUES("${user_id}", "${req.body.username}", "${id_cliente}", "${req.body.email}", "${hashedPassword}", 2, NOW())`, (error, rows, columns) => {
                                    if (error) {
                                        res.json({status: 0, mensaje: "Error en el servidor. " + error });
                                    }
                                    else {
                                        let id_cuenta = uuidv4();
                                        let num_cuenta = generarNumeroCuenta();

                                        connection.query(`INSERT INTO cuentas VALUES("${id_cuenta}", "${num_cuenta}", "${req.body.id_tipo_cuenta}", 1, 0.00, NOW(), 
                                                                                    "${id_cliente}", 1)`, (error, rows, columns) => {
                                            if (error) {
                                                res.json({status: 0, mensaje: "Error en el servidor. " + error });
                                            }
                                            else {
                                                res.json({status: 1, mensaje: "Cliente registrado correctamente."});
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.json({status: 0, mensaje: "Este username ya se encuentra registrado."});
                    }
                });
            }
            else {
                res.json({status: 0, mensaje: "Este DPI ya se encuentra registrado."});
            }
        });
    });
}