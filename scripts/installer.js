const fs = require("fs");
var npm = require("npm");

exports.installer = () => {
  npm.load(
    {
      loaded: false,
    },
    function (err) {
      npm.commands.install(
        [
          "react-redux",
          "react-native-vector-icons",
          "@react-navigation/native",
          "@react-navigation/bottom-tabs",
          "@react-navigation/drawer",
          "@react-navigation/stack",
          "@react-navigation/material-top-tabs",
          "react-native-safe-area-context",
          "react-native-svg",
          "react-native-screens",
          "react-native-reanimated",
          "react-native-gesture-handler",
          "react-native-dropdown-picker"
        ],
        function (er, data) {}
      );
      npm.on("log", function (message) {
        console.log(message);
      });
    }
  );
};
