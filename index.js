const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
var app = express();

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Failproof02@@",
  database: "EmployeeDB",
  multipleStatements: true
  //insecureAuth: true,
  //port: 3306
});

mysqlConnection.connect(err => {
  if (!err) console.log("DB connection succeded");
  else
    console.log(
      "DB connection failed \n Error: " + JSON.stringify(err, undefined, 2)
    );
});

app.listen(4000, () =>
  console.log("Express server is running at port no: 4000")
);

//GET ALL EMPLOYEES    //always put req first than res
app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM Employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    //this send parse the object to json data
    else console.log(err);
  });
});

//GET AN EMPLOYEE      /employees/1
app.get("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      //this send parse the object to json data
      else console.log(err);
    }
  );
});

//DELETE AN EMPLOYEE
app.delete("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully");
      //this send parse the object to json data
      else console.log(err);
    }
  );
});

//INSERT AN EMPLOYEE
app.post("/employees", (req, res) => {
  var emp = req.body;
  var sql =
    "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err)
        rows.forEach(element => {
          if (element.constructor == Array)
            res.send("Inserted employee id : " + element[0].EmpID);
        });
      //res.send(rows);
      //this send parse the object to json data
      else console.log(err);
    }
  );
});

//UPDATE AN EMPLOYEE
app.put("/employees", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?;SET @Salary = ?; \
      CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) res.send("Updated Successfully");
      else console.log(err);
    }
  );
});
