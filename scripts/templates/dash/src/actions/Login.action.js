import { LOGIN, PASSWORD } from "./Actions";
import { api, APIS } from "../config/Config";

export function loginAction({ email, password }, callback, toast) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: LOGIN.LOADING });
      res = await api(APIS.login, "POST", { email, password });

      const { success, data } = res.data;

      if (success === "true") {
        dispatch({ type: LOGIN.SUCCESS });
        callback && callback(data.data.token);
        toast({
          message: `Login Successful!!`,
          type: "success",
        });
      } else {
        dispatch({ type: LOGIN.ERROR });
        toast({
          message: data.message,
          type: "error",
        });
      }
    } catch ({ message }) {
      dispatch({ type: LOGIN.ERROR });
      toast({
        message: `Login Failed!!`,
        type: "error",
      });
      console.error(message);
      return 0;
    }
  };
}

export function passwordAction(body, modalCloseHandler, toast) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: PASSWORD.LOADING });
      res = await api(APIS.password, "PATCH", body);

      const { success, data } = res.data;

      if (success === "true") {
        dispatch({ type: PASSWORD.SUCCESS });
        toast({ message: "Password Changed Successfully", type: "success" });
        modalCloseHandler();
      } else {
        dispatch({ type: PASSWORD.ERROR });
        toast({ message: data.message, type: "error" });
      }
    } catch ({ message }) {
      dispatch({ type: PASSWORD.ERROR });
      console.error(message);
      toast({ message: "Error Changing Password", type: "error" });
      return 0;
    }
  };
}
