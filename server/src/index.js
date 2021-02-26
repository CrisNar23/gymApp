const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../config/variables.env" });

/******************** Backend gymApp ********************/

/* Create server express*/
const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Enable CORS */
app.use(cors());

/******************** Endpoints Path ********************/

/* Path to use endpoints */
app.use(require("./routes/gymApp"));

/******************** Start server ********************/

/* Server Port */
const PORT = process.env.PORT || 3000;

/* Start the server on the defined port */
app.listen(PORT, () => {
  console.log(
    `Server listening on port: ${PORT} ->`,
    new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })
  );
});
