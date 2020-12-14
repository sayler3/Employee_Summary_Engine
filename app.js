const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// employee array
let employees = [];

// questions for user
const questions = [
	{
		type: "list",
		name: "title",
		message: "What type of employee would you like to add",
		choices: ["Manager", "Engineer", "Intern"],
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
			return userInput.title === "Manager";
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
		case "Manager":
			employee = new Manager(
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
};

const addEmployee = (userInput) => {
    if(userInput.addMore){
        init();
    } else {
        console.log(employees);
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFile(outputPath, render(employees), (err) => {
            if (err) throw err;
        });
    }
}

init();