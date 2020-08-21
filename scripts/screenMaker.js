const fs = require("fs");

const makeScreen = (screenName) => {
  return `import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export const ${screenName} = (props) => {
  return (
    <View style={styles.container}>
      <Text>${screenName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});`;
};

const exportScreen = (screenName) => {
  return `export * from "./${screenName}.screen"`;
};

const actionTypes = (screenName) => {
  return `import { createActionSet } from "../helpers";

    export const ${screenName.toUpperCase()} = createActionSet("${screenName.toUpperCase()}");
    `;
};

const reducer = (screenName) => {
  return `import { ${screenName.toUpperCase()} } from "./${screenName}.actionTypes";

    const initialState = {
      loader: false,
      error:false
    };
    
    export function ${screenName}Reducer(state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        case ${screenName.toUpperCase()}.LOADING:
          return { ...state, loader: true , error:false };
        case ${screenName.toUpperCase()}.SUCCESS:
          return {
            ...state,
            loader: false,
            error:false
          };
        case ${screenName.toUpperCase()}.ERROR:
          return { ...state, loader: false , error:true };
    
        default:
          return state;
      }
    }
    `;
};

const actionsScreen = (screenName) => {
  return `import { api } from "../helpers/api.helpers";
    import { APIS } from "../config/";
    import { ${screenName.toUpperCase()} } from "./${screenName}.actionTypes";
    
    export function get() {
      
    }`;
};

const allscreen = () => {
  return `export * from "./screens";`;
};

exports.learn = (screen) => {
  const CURR_DIR = process.cwd();
  fs.mkdirSync(`${CURR_DIR}/${screen}`);
  fs.mkdirSync(`${CURR_DIR}/${screen}/screens`);
  const screens = `${CURR_DIR}/${screen}/screens/${screen}.screen.js`;
  const screen_index = `${CURR_DIR}/${screen}/screens/index.js`;
  fs.writeFileSync(screens, makeScreen(screen), "utf8");
  fs.appendFile(screen_index, exportScreen(screen), (err) => {
    if (err) throw err;
  });

  const action_types = `${CURR_DIR}/${screen}/${screen}.actionTypes.js`;
  fs.appendFile(action_types, actionTypes(screen), (err) => {
    if (err) throw err;
  });

  const actions = `${CURR_DIR}/${screen}/${screen}.action.js`;
  fs.appendFile(action_types, actionsScreen(screen), (err) => {
    if (err) throw err;
  });

  const reducers = `${CURR_DIR}/${screen}/${screen}.reducer.js`;
  fs.appendFile(reducers, reducer(screen), (err) => {
    if (err) throw err;
  });
  const all_screen = `${CURR_DIR}/${screen}/index.js`;
  fs.appendFile(all_screen, allscreen(), (err) => {
    if (err) throw err;
  });
};
