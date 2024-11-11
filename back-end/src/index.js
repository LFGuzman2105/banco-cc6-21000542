const app = require('./config/config');
require("./app/ClienteUsuario")(app);
require("./app/login")(app);
require("./app/transacciones")(app);
require("./app/cuentas")(app);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});