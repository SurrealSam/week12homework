const inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password123"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

function getInfo() {
  inquirer
    .prompt([
      {
        type: "list", message: "What would you like to do?",
        name: "action",
        choices: ["Add information", "View information", "Update the role of an employee"]
      },
      {
        type: "list", message: "What would you like to do?",
        name: "adding",
        choices: ["Add Employee", "Add Role", "Add Department"],
        when: function (answers) {
          return answers.action === "Add information";
        }
      },
      {
        type: 'input',
        name: 'firstname',
        message: "Employee's first name?",
        when: function (answers) {
          return answers.adding === "Add Employee";
        }
      },
      {
        type: 'input',
        name: 'lastname',
        message: "Employee's last name?",
        when: function (answers) {
          return answers.adding === "Add Employee";
        }
      },
      {
        type: 'input',
        name: 'roleid',
        message: "Employee's role id#?",
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
        when: function (answers) {
          return answers.adding === "Add Employee";
        }
      },
      {
        type: 'input',
        name: 'managerid',
        message: "Employee's manager? (Leave blank if none)",
        when: function (answers) {
          return answers.adding === "Add Employee";
        }
      },
      {
        type: 'input',
        name: 'title',
        message: "What role would you like to add?",
        when: function (answers) {
          return answers.adding === "Add Role";
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is the salary for this position? (whole number, no $ sign)",
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
        when: function (answers) {
          return answers.adding === "Add Role";
        }
      },
      {
        type: 'input',
        name: 'departmentid',
        message: "What is the id# of this role's department?",
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
        when: function (answers) {
          return answers.adding === "Add Role";
        }
      },
      {
        type: 'input',
        name: 'departmentname',
        message: "What is the name of the department you would like to add?",
        when: function (answers) {
          return answers.adding === "Add Department";
        }
      },
      {
        type: "list", message: "What would you like to do?",
        name: "viewing",
        choices: ["View Employees", "View Roles", "View Departments"],
        when: function (answers) {
          return answers.action === "View information";
        }
        /* Pass your questions in here */
      },
      {
        type: 'input',
        name: 'employeeToUpdate',
        message: "Which employee would you like to update? (employee id#)",
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
        when: function (answers) {
          return answers.action === "Update the role of an employee";
        }
      },
      {
        type: 'input',
        name: 'updatedrole',
        message: "What is their new role? (role id#)",
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
        when: function (answers) {
          return answers.action === "Update the role of an employee";
        }
      },
      {
        type: "confirm", message: "Would you like to continue?",
        name: "continue"
      }
    ])
    .then(answers => {
      console.log(answers);

      let table;
      let statement;
      let args;
      let values;


      if (answers.action === "Add information") {



        if (answers.adding === "Add Employee") {
          table = "employees";
          args = " (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID)";
          values = ' VALUES ("' + answers.firstname + '", "' + answers.lastname + '", "' + answers.roleid + '", "' + answers.managerid + '")';
        }
        if (answers.adding === "Add Role") {
          table = "roles";
          args = " (TITLE, SALARY, DEPARTMENT_ID)";
          values = ' VALUES ("' + answers.title + '", "' + answers.salary + '", "' + answers.departmentid + '")';
        }
        if (answers.adding === "Add Department") {
          table = "department";
          args = " (NAME)";
          values = ' VALUES ("' + answers.departmentname + '")';


        }
        statement = `INSERT INTO employees_db.` + table + args + values;
        console.log(statement);
        console.log("Database updated!");
      }

      if (answers.action === "View information") {

        if (answers.viewing === "View Employees") {
          table = "employees";
        }
        if (answers.viewing === "View Roles") {
          table = "roles";
        }
        if (answers.viewing === "View Departments") {
          table = "department";
        }

        statement = 'SELECT * FROM employees_db.' + table;

      }

      if (answers.action == "Update the role of an employee") {
        statement = `UPDATE employees_db.employees SET ROLE_ID =` + answers.updatedrole + ` 
        WHERE ID =` + answers.employeeToUpdate;
      }



      connection.query(statement, function (error, results, fields) {
        if (error) throw error;
        console.table(results);
        //tried using a json.stringify but it looked worse in the console log on terminal
      });





      if (answers.continue) {
        getInfo();
      }
      else {
        connection.end();
      }

    });


};

getInfo();