const app = require('./config/config');
require("./app/ClienteUsuario")(app);
require("./app/login")(app);
require("./app/transacciones")(app);
require("./app/cuentas")(app);
require("./app/tarjetas")(app);
const port = 3000;
const fecha_hora = new Date();

app.listen(port, () => {
  console.log(`Server is running on port ${port}, ${fecha_hora}`);
});