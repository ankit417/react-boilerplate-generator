// VALIDATOR
export function validator(errorObject) {
  return function (key, condition, callback) {
    if (condition) {
      errorObject[key] = true;
      callback && callback();
    } else {
      delete errorObject[key];
    }
  };
}

export function isValid(errorObject) {
  return Object.keys(errorObject).length === 0;
}
