const fs = require("fs");


const actionTypes = (screen) => {
  return `
//${screen.toUpperCase()} ACTION SET 
export const ${screen.toUpperCase()} = createActionSet("${screen.toUpperCase()}")`;
};

const actionsExport = (screen) => {
  return `
export * from "./${screen}.action.js";`;
};

const actionsScreen = (screen) => {
  return `import {
${screen.toUpperCase()}
} from "./Actions";
import { APIS } from "../config/Config";
import { api } from "../helpers/Helpers";

export function ${screen.toLowerCase()}Action({ param1, param2 }) {
    return async function(dispatch) {
        let res;
        try {
            dispatch({ type:  ${screen.toUpperCase()}.LOADING });
                res = await api(
                  APIS.sample,
                  "POST",
                  { param1, param2 }
                );

                const { success } = res;

                if(success) {
                  dispatch({ type:  ${screen.toUpperCase()}.SUCCESS });
                } else {
                  dispatch({ type:  ${screen.toUpperCase()}.ERROR });
                }

              } catch({ message }) {
                dispatch({ type:  ${screen.toUpperCase()}.ERROR });
                console.error(message);
                return 0;
        }
    }
}
        `;
};

const reducer = (screen) => {
  return `import {
${screen.toUpperCase()}
} from "../actions/Actions";

const initalState = {
loading:false,
error:false
};

export function ${screen.toLowerCase()}Reducer(state = initalState, action) {
    const { type } = action;

    switch(type) {
        case ${screen.toUpperCase()}.LOADING:
            return {...state, loading: true, error:false};
        case ${screen.toUpperCase()}.SUCCESS:
            return {...state, loading: false, error:false};
        case ${screen.toUpperCase()}.ERROR:
            return {...state, loading: false, error:true};
        default:
            return state;
            }
          }`;
};



exports.actionMaker = (screen) => {
  const CURR_DIR = process.cwd();
  const pageName = screen.charAt(0).toUpperCase() + screen.slice(1);

  const action_types = `${CURR_DIR}/actions/ActionTypes.action.js`;
  fs.appendFile(action_types, actionTypes(screen), (err) => {
    if (err) throw err;
  });

  const actions = `${CURR_DIR}/actions/${pageName}.action.js`;
  fs.appendFile(actions, actionsScreen(pageName), (err) => {
    if (err) throw err;
  });

  const actions_export = `${CURR_DIR}/actions/Actions.js`;
  fs.appendFile(actions_export, actionsExport(pageName), (err) => {
    if (err) throw err;
  });

  const reducers = `${CURR_DIR}/reducers/${pageName}.reducer.js`;
  fs.appendFile(reducers, reducer(screen), (err) => {
    if (err) throw err;
  });

};
