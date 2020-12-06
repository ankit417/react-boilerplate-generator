const fs = require("fs");
var npm = require("npm");

exports.web_installer = () => {
  npm.load(
    {
      loaded: false,
    },
    function (err) {
      npm.commands.install(
        [
          "react-redux",
          "axios",
          "node-sass",
          "react",
          "react-dom",
          "react-router-dom",
          "react-scripts",
          "react-uicomp@2.0.1",
          "react-auth-navigation",
          "universal-cookie",
        ],
        function (er, data) {}
      );
      npm.on("log", function (message) {
        console.log(message);
      });
    }
  );
};
