// CREATE THE ACTION SET
export function createActionSet(actionName) {
  return {
    LOADING: `${actionName}_LOADING`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`,
    actionName
  };
}