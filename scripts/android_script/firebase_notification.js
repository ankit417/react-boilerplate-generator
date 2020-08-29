const fs = require("fs");
var npm = require("npm");

const project_gradle_modifier = (path) => {
  let file = fs.readFileSync(path, "utf-8");
  let arr = file.split(/\r?\n/);
  var lineNumber = 1;

  for (let line of arr) {
    if (line.includes("classpath")) {
      arr.splice(
        lineNumber,
        0,
        `        classpath("com.google.gms:google-services:4.3.3")`
      );
      var updateData = arr.join("\n");
      fs.writeFile(path, updateData, function (err) {
        if (err) return console.log(err);
      });
      break;
    } else {
      lineNumber++;
    }
  }
};

const app_gradle_modifier = (path) => {
  let file = fs.readFileSync(path, "utf-8");
  let arr = file.split(/\r?\n/);

  arr.splice(2, 0, `apply plugin: 'com.google.gms.google-services'`);
  var updateData = arr.join("\n");
  fs.writeFile(path, updateData, function (err) {
    if (err) return console.log(err);
  });

  var lineNumber = 1;

  for (let line of arr) {
    if (line.includes("implementation")) {
      arr.splice(
        lineNumber,
        0,
        `    implementation 'com.google.firebase:firebase-analytics:17.5.0'`
      );
      var updateDependencies = arr.join("\n");
      fs.writeFile(path, updateDependencies, function (err) {
        if (err) return console.log(err);
      });
      break;
    } else {
      lineNumber++;
    }
  }
};


exports.firebase_installer = () => {
  npm.load(
    {
      loaded: false,
    },
    function (err) {
      npm.commands.install(
        [
          "@react-native-firebase/app",
          "@react-native-firebase/messaging"
        ],
        function (er, data) {}
      );
      npm.on("log", function (message) {
        console.log(message);
      });
    }
  );
};

exports.firebaseNotification = () => {
  const CURR_DIR = process.cwd();

  const project_gradle = `${CURR_DIR}/android/build.gradle`;
  project_gradle_modifier(project_gradle);
  const app_gradle = `${CURR_DIR}/android/app/build.gradle`;
  app_gradle_modifier(app_gradle);
};
