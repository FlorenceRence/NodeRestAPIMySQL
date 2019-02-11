const mysql = require("mysql");

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

exports.get_employee = (req, res) => {
  mysqlConnection.query("SELECT * FROM Employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    //res.send parse the object to json data
    else console.log(err);
  });
};
exports.get_employee_byId = (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
exports.delete_employee_byId = (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
    }
  );
};
exports.save_employee = (req, res) => {
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
      else console.log(err);
    }
  );
};
exports.update_employee = (req, res) => {
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
};
