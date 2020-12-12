const fs = require("fs");
const inquirer = require("inquirer");
const { exec } = require("child_process");
const CHOICES = ["hello", "hi"];

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
];

const CURR_DIR = process.cwd();

const projectgenerate = () => {
  inquirer.prompt(QUESTIONS).then((answers) => {
    const projectChoice = answers["project-choice"];
    console.log("project choice", projectChoice);
    createProject(projectChoice);
    // const projectName = answers["project-name"];
    // const templatePath = `${__dirname}/templates/${projectChoice}`;

    // fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    // createDirectoryContents(templatePath, projectName);
  });
};

projectgenerate();

function createProject(type) {
  switch (type) {
    case "hello":
      dashGenerator();
      return;
    default:
      return;
  }
}

function dashGenerator() {
  exec(
    "git clone https://github.com/dipeshrai123/boilerplate-for-react",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}
// function createDirectoryContents(templatePath, newProjectPath) {
//   const filesToCreate = fs.readdirSync(templatePath);

//   filesToCreate.forEach((file) => {
//     const origFilePath = `${templatePath}/${file}`;

//     // get stats about the current file
//     const stats = fs.statSync(origFilePath);

//     if (stats.isFile()) {
//       const contents = fs.readFileSync(origFilePath, "utf8");

//       const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
//       fs.writeFileSync(writePath, contents, "utf8");
//     } else if (stats.isDirectory()) {
//       fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

//       // recursive call
//       createDirectoryContents(
//         `${templatePath}/${file}`,
//         `${newProjectPath}/${file}`
//       );
//     }
//   });
// }
