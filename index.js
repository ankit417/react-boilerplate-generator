#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");

const generator = require("./scripts/projectGenerator");
const screenGenerator = require("./scripts/screenMaker");
const webScreenGenerator = require("./scripts/web_script/screen_maker");
const actionGenerator = require("./scripts/web_script/action_maker");
const libraryInstaller = require("./scripts/installer");
const help = require("./scripts/help")
var arguments = process.argv;

switch (arguments[2]) {
  case "generate":
    generator.projectgenerate();
    break;
  case "make:screen":
    screenGenerator.screenMaker(arguments[3]);
    break;
  case "web:screen":
    webScreenGenerator.webScreenMaker(arguments[3]);
    break;
  case "web:action":
    actionGenerator.actionGenerator.actionMaker(arguments[3]);
    break;
  case "make:install":
    libraryInstaller.installer();
    break;
  case "help":
      return help.help()
  default:
    return;
}
