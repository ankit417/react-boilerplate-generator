import { SAMPLE } from "./Actions";
import { api, APIS } from "../config/Config";

export function sampleAction({ param1, param2 }) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: SAMPLE.LOADING });

      res = await api(`${APIS.sample}`, "POST", { param1, param2 });

      const { success } = res.data;

      if (success) {
        dispatch({ type: SAMPLE.SUCCESS });
      } else {
        dispatch({ type: SAMPLE.ERROR });
      }
    } catch ({ message }) {
      dispatch({ type: SAMPLE.ERROR });
      console.error(message);
      return 0;
    }
  };
}
