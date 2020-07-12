const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function question() {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is your Github Username?"
        },
        {
            type: "input",
            name: "projectname",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please describe your project"
        },
        {
            type: "input", 
            name: "command",
            message: "Commands to run?"
        },
        {
            type: "input",
            name: "license",
            message: "Any licenses?"
        },
        {
            type: "input",
            name: "contributors",
            message: "Who are the contributors?"
        },
        {
            type: "input",
            name: "test",
            message: "Commands to test?"
        }
    ]);
}

function generateReadme(answers) {
    return `
    My Github username is ${answers.github}. 

    My project name is ${answers.projectname}. 

    This project is intended to do the following: ${answers.description}.

    Project Command lines needed to run: ${answers.command}. 

    Project licenses: ${answers.license}. 

    Project contributors: ${answers.contributors}. 
    
    Commands to test: ${answers.test}
    `;
}

question()
    .then(function(answers) {
        const readMe = generateReadme(answers);
        return writeFileAsync("README.md", readMe);
    })
    .then(function() {
    console.log("Successfully wrote to README.md");
    })
    .catch(function(err) {
        console.log(err);
    })