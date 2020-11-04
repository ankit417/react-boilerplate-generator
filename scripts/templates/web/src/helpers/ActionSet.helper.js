// ACTION SET GENERATOR
export function createActionSet(actionName) {
  return {
    CLEAR: `${actionName}_CLEAR`,
    LOADING: `${actionName}_LOADING`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`,
    PROGRESS: `${actionName}_PROGRESS`,
  };
}
