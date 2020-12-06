const fs = require("fs");
var npm = require("npm");

exports.dash_installer = () => {
  npm.load(
    {
      loaded: false,
    },
    function (err) {
      npm.commands.install(
        [
          "@material-ui/core",
          "@material-ui/lab",
          "@testing-library/jest-dom",
          "@testing-library/react",
          "@testing-library/user-event",
          "axios",
          "draft-js",
          "draftjs-to-html",
          "material-table",
          "moment",
          "node-sass",
          "react@16.13.1",
          "react-auth-navigation",
          "react-dom@16.13.1",
          "react-draft-wysiwyg",
          "react-hook-form",
          "react-icons",
          "react-images-uploading@3.1.2",
          "react-redux",
          "react-router-dom",
          "react-scripts",
          "react-select",
          "react-uicomp@2.0.1",
          "redux",
          "redux-thunk",
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
