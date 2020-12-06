#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");

const generator = require("./scripts/projectGenerator");
const webScreenGenerator = require("./scripts/web_script/screen_maker");
const actionGenerator = require("./scripts/web_script/action_maker");
const webInstaller = require("./scripts/web_script/web_installer");
const libraryInstaller = require("./scripts/installer");
const screenGenerator = require("./scripts/screenMaker");
const splashGenerator = require("./scripts/android_script/splash_screen");
const iconGenerator = require("./scripts/android_script/icon_generator");
const splashImageGenerator = require("./scripts/android_script/splash_image");
const firebase = require("./scripts/android_script/firebase_notification");
const commonMaker = require("./scripts/web_script/common_maker");
const help = require("./scripts/help");

//DASHBOARD GENERATOR
const dashboard = require("./scripts/dash_script/crud_maker");
const dashInstaller = require("./scripts/dash_script/dash_installer");
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
    actionGenerator.actionMaker(arguments[3]);
    break;
  case "web:install":
    webInstaller.web_installer();
    break;
  case "make:install":
    libraryInstaller.installer();
    break;
  case "android:splashscreen":
    splashGenerator.splashScreen();
    break;
  case "android:res":
    iconGenerator.generateIcon(arguments[3]);
    break;
  case "android:splash":
    splashImageGenerator.generateSplash(arguments[3]);
    break;
  case "android:firebase":
    firebase.firebaseNotification();
    break;
  case "android:firebase-install":
    firebase.firebase_installer();
    break;
  case "dash:screen":
    dashboard.dashMaker(arguments[3]);
    break;
  case "dash:install":
    dashInstaller.dash_installer(arguments[3]);
    break;
  case "web:common":
    commonMaker.webCommonMaker(arguments[3]);
    break;
  case "help":
    return help.help();
  default:
    return;
}
