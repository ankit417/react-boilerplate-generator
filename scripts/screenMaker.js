const fs = require("fs");

const makeScreen = (screenName) => {
  return `import React, { useState , useEffect } from "react";
  import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
  } from "react-native";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigation,useNavigationState } from "@react-navigation/native";

import {get${screenName}Action} from "../${screenName}.action"
import {useCurrentNavigationState} from '../../../hooks';
import { colors, fonts, spacing } from "../../../modules";
const { height, width } = Dimensions.get("window");

export const ${screenName}Screen = () => {
  const navigation = useNavigation();
  const {name, key} = useNavigationState(state => state.routes[state.index]);
  const currentStack = useCurrentNavigationState();
  const dispatch = useDispatch();

  const {${screenName}loader, ${screenName}Data}  = useSelector((state) => state.${screenName});

  useEffect(()=>{
    dispatch(get${screenName}Action());
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Text>${screenName} Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: colors.light.borderColor,

  },
});
`;
};

const exportScreen = (screenName) => {
  return `export * from "./${screenName}.screen"`;
};

const actionTypes = (screenName) => {
  return `import {createActionSet} from '../../helpers';
  
export const ${screenName.toUpperCase()} = createActionSet("${screenName.toUpperCase()}");
`;
};

const reducer = (screenName) => {
  return `import { ${screenName.toUpperCase()} } from "./${screenName}.actionTypes";

    const initialState = {
      ${screenName}loader: false,
      ${screenName}Data:[],
      error:false
    };
    export function ${screenName}Reducer(state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        case ${screenName.toUpperCase()}.LOADING:
          return { ...state, ${screenName}loader: true , error:false };
        case ${screenName.toUpperCase()}.SUCCESS:
          return {
            ...state,
            ${screenName}loader: false,
            ${screenName}Data:payload,
            error:false
          };
        case ${screenName.toUpperCase()}.ERROR:
          return { ...state, ${screenName}loader: false , error:true };
        default:
          return state;
      }
    }
    `;
};

const actionsScreen = (screenName) => {
  return `import {api, APIS} from '../../config'
   import { ${screenName.toUpperCase()} } from "./${screenName}.actionTypes";
    export function get${screenName}Action() {
      return async function (dispatch) {
        let res;
        try {
          dispatch({
            type: ${screenName.toUpperCase()}.LOADING,
          });
          res = await api();
          const {success, data} = res.data;
          if (success) {
            dispatch({
              type: ${screenName.toUpperCase()}.SUCCESS,
              payload: data,
            });
            return 1;
          } else {
            dispatch({type: ${screenName.toUpperCase()}.ERROR});
          }
        } catch ({message}) {
          dispatch({
            type: ${screenName.toUpperCase()}.ERROR,
          });
          console.error(message);
          return 0;
        }
      };
    }`;
};

const allscreen = () => {
  return `export * from "./screens";`;
};

// const reducer_modifier = (path) => {
//   let file = fs.readFileSync(path, "utf-8");
//   let arr = file.split(/\r?\n/);

// }
const reducer_modifier = (screenName) => {
  return `
  // import {${screenName}Reducer} from '../screens/${screenName}Screen/${screenName}.reducer';
  // ${screenName}: ${screenName}Reducer
  `;
};

exports.screenMaker = (screen) => {
  const CURR_DIR = process.cwd();
  fs.mkdirSync(`${CURR_DIR}/src/screens/${screen}Screen`);
  fs.mkdirSync(`${CURR_DIR}/src/screens/${screen}Screen/screens`);
  const screens = `${CURR_DIR}/src/screens/${screen}Screen/screens/${screen}.screen.js`;
  const screen_index = `${CURR_DIR}/src/screens/${screen}Screen/screens/index.js`;
  fs.writeFileSync(screens, makeScreen(screen), "utf8");
  fs.appendFile(screen_index, exportScreen(screen), (err) => {
    if (err) throw err;
  });

  const action_types = `${CURR_DIR}/src/screens/${screen}Screen/${screen}.actionTypes.js`;
  fs.appendFile(action_types, actionTypes(screen), (err) => {
    if (err) throw err;
  });

  const actions = `${CURR_DIR}/src/screens/${screen}Screen/${screen}.action.js`;
  fs.appendFile(actions, actionsScreen(screen), (err) => {
    if (err) throw err;
  });

  const reducers = `${CURR_DIR}/src/screens/${screen}Screen/${screen}.reducer.js`;
  fs.appendFile(reducers, reducer(screen), (err) => {
    if (err) throw err;
  });
  const all_screen = `${CURR_DIR}/src/screens/${screen}Screen/index.js`;
  fs.appendFile(all_screen, allscreen(), (err) => {
    if (err) throw err;
  });

  const store = `${CURR_DIR}/src/store/reducers.js`;
  fs.appendFile(store, reducer_modifier(screen), (err) => {
    if (err) throw err;
  });
  // reducer_modifier(store);
};

// const reducer_modifier = (screenName) => {
//   return `
// // import {${screenName}Reducer} from '../screens/${screenName}Screen/${screenName}.reducer';
// // ${screenName}: ${screenName}Reducer
// `;
// };
