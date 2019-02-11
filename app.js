const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const employeeRoutes = require("./api/routes/employee");

app.use(bodyparser.json());

app.use("/employees", employeeRoutes);

module.exports = app;
