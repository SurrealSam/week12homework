const inquirer = require('inquirer');
var mysql = require('mysql');

inquirer
  .prompt([
    {
      type: "list", message: "What would you like to do?",
      name: "action",
      choices: ["Add information", "View information"]
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
      type: "list", message: "What would you like to do?",
      name: "viewing",
      choices: ["View Employees", "View Roles", "View Departments"],
      when: function (answers) {
        return answers.action === "View information";
  }
    /* Pass your questions in here */
  ])
  .then(answers => {
    console.log(answers);
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Password123"
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
    // Use user feedback for... whatever!!
  });