import {
  OPEN_SNACK,
  CLOSE_SNACK,
} from "./snack.actionTypes";

export const MESSAGE_TYPE = {
  SUCCESS: "success",
  ERROR: "error"
};

export function openSnack(message, type=MESSAGE_TYPE.SUCCESS) {
  return async function(dispatch) {
    const payload = { message, type };
    dispatch({ type: OPEN_SNACK, payload });
  }
}

export function closeSnack() {
  return async function(dispatch) {
    dispatch({ type: CLOSE_SNACK });
  }
}