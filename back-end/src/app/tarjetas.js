const { v4: uuidv4 } = require('uuid');
const connection = require('../config/configDB');

function generarNumeroTarjeta() {
    let numero = '';

    while (numero.length < 16) {
      const aleatorio = Math.floor(Math.random() * 10**10).toString();
      numero += aleatorio;
    }

    return numero.slice(0, 16);
}

function generarCVV() {
    let numero = '';

    while (numero.length < 3) {
      const aleatorio = Math.floor(Math.random() * 10**10).toString();
      numero += aleatorio;
    }

    return numero.slice(0, 3);
}

function generarFechaVencimiento(años = 3) {
    const fechaActual = new Date();
    const añoDeVencimiento = fechaActual.getFullYear() + años;
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato MM
    const dia = fechaActual.getDate().toString().padStart(2, '0'); // Día en formato DD
    return `${añoDeVencimiento}-${mes}-${dia}`; // Retorna la fecha en formato MM/DD/YYYY
}

module.exports = (app) => { 
    app.post('/datosTarjeta', (req, res) => {
        connection.query(`SELECT id_tarjeta, no_tarjeta, mt.descripcion as marca, ct.descripcion as categoria, codigo, fecha_vencimiento FROM tarjetas t, categoria_tarjeta ct,
            marca_tarjeta mt WHERE t.id_categoria_tarjeta = ct.id_categoria_tarjeta AND t.id_marca = mt.id_marca AND t.id_ref_cuenta = "${req.body.id_cuenta}"`, (error, rows, columns) => { 
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length == 0) {
                return res.json({status: 0, mensaje: "Datos de tarjeta no encontrados."});
            }
            else {
                return res.json({status: 1, mensaje: "Datos de tarjeta de la cuenta obtenidos.", data: rows});
            }
        });
    });

    app.post('/solicitarTarjeta', (req, res) => {
        connection.query(`SELECT id_tarjeta FROM tarjetas WHERE id_ref_cuenta = "${req.body.id_ref_cuenta}"`, (error, rows, columns) => { 
            if (error) {
                return res.json({status: 0, mensaje: "Error en el servidor. " + error});
            }
            else if (rows.length > 0) {
                return res.json({status: 0, mensaje: "Esta cuenta ya posee una tarjeta."});
            }
            else {
                let id_tarjeta = uuidv4();
                let num_tarjeta = generarNumeroTarjeta();
                let CVV = generarCVV();
                const fecha_vencimiento = generarFechaVencimiento(4); // Cambia el valor si quieres un periodo distinto;

                connection.query(`INSERT INTO tarjetas VALUES("${id_tarjeta}", "${num_tarjeta}", "${req.body.id_marca_tarjeta}", null, 2, "${req.body.id_categoria_tarjeta}",
                    "${CVV}", "${fecha_vencimiento}", "${req.body.id_cliente_tarjeta}", "${req.body.id_ref_cuenta}", 1)`, (error, rows, columns) => { 
                    if (error) {
                        return res.json({status: 0, mensaje: "Error en el servidor. " + error});
                    }
                    else {
                        return res.json({status: 1, mensaje: "Tarjeta solicitada exitosamente."});
                    }
                });
            }
        });
    });
}