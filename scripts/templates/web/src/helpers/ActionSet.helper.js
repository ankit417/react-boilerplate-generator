export function createActionSet(actionName, hasProgress = false) {
  const actionObj = {
    LOADING: `${actionName}_LOADING`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`,
  };

  if (hasProgress) {
    actionObj.PROGRESS = `${actionName}_PROGRESS`;
  }

  return actionObj;
}
