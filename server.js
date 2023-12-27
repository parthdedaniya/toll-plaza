const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config("./.env");
require("./db/conn");

app.use(require("./routers/toll"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on", port);
});
