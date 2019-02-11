const express = require("express");
//const router = express("router");
const router = express.Router();
const mysql = require("mysql");

const EmployeeController = require("../controllers/employee");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Failproof02@@",
  database: "EmployeeDB",
  multipleStatements: true
});
mysqlConnection.connect(err => {
  if (!err) console.log("DB connection succeded");
  else
    console.log(
      "DB connection failed \n Error: " + JSON.stringify(err, undefined, 2)
    );
});
//GET ALL EMPLOYEES    //always put req first than res
router.get("/", EmployeeController.get_employee);

//GET AN EMPLOYEE      /employees/1
router.get("/:id", EmployeeController.get_employee_byId);

//DELETE AN EMPLOYEE
router.delete("/:id", EmployeeController.delete_employee_byId);

//INSERT AN EMPLOYEE
router.post("/", EmployeeController.save_employee);

//UPDATE AN EMPLOYEE
router.put("/", EmployeeController.update_employee);

module.exports = router;
