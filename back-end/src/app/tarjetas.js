const connection = require('../config/configDB');

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
}