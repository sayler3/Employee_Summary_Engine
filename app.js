const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Manger = require("./lib/Manager");

// employee array
let employees = [];

// questions for user
const questions = [
	{
		type: "list",
		name: "title",
		message: "What type of employee would you like to add",
		choices: ["Manger", "Engineer", "Intern"],
	},
	{
		type: "input",
		name: "name",
		message: "What is the name of the new employee",
	},
	{
		type: "input",
		name: "id",
		message: "What is the employee's id number",
	},
	{
		type: "input",
		name: "email",
		message: "What is the employee's email address",
	},
	{
		type: "input",
		name: "officeNum",
		message: "What is the manger's phone number",
		when: function (userInput) {
			return userInput.title === "Manger";
		},
	},
	{
		type: "input",
		name: "github",
		message: "What is the engineer's github address",
		when: function (userInput) {
			return userInput.title === "Engineer";
		},
	},
	{
		type: "input",
		name: "school",
		message: "What school does the intern go to",
		when: function (userInput) {
			return userInput.title === "Intern";
		},
	},
	{
		type: "confirm",
		name: "addMore",
		message: "Would you like to add more employee's",
	},
];

const init = async () => {
	try {
		// Prompt questions
		const userInput = await inquirer.prompt(questions);

        pushEmployee(userInput);
        console.log(userInput.addMore);

        addEmployee(userInput);
	} catch (err) {
		console.log(err);
	}
};

// function to push employee to array
const pushEmployee = (userInput) => {
	switch (userInput.title) {
		case "Manger":
			employee = new Manger(
				userInput.name,
				userInput.id,
				userInput.email,
				userInput.officeNum
			);
			break;
		case "Engineer":
			employee = new Engineer(
				userInput.name,
				userInput.id,
				userInput.email,
				userInput.github
			);
			break;
		case "Intern":
			employee = new Intern(
				userInput.name,
				userInput.id,
				userInput.email,
				userInput.school
			);
			break;
	}
	employees.push(employee);
	console.log(employees);
};

const addEmployee = (userInput) => {
    if(userInput.addMore){
        init();
    } 
    
    // else {
    //     console.log(employees);
    //     if ()
    //     fs.writeFile(outputPath, render(employees), (err) => {
    //         if (err) throw err;
    //     });
    // }
    // employees.push(employee);
    // console.log(employees);
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
