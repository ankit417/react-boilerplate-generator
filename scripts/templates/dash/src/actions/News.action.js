import { NEWS, ADD_NEWS, DELETE_NEWS, NEWS_DETAIL, EDIT_NEWS } from "./Actions";
import { api, APIS, TABLE_LIMIT } from "../config/Config";

export function getNewsAction(page) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: NEWS.LOADING });
      res = await api(`${APIS.news}&page=${page}&limit=${TABLE_LIMIT}`);

      const { success, data } = res.data;

      if (success === "true") {
        dispatch({ type: NEWS.SUCCESS, payload: data.data });
      } else {
        dispatch({ type: NEWS.ERROR });
      }
    } catch ({ message }) {
      dispatch({ type: NEWS.ERROR });
      console.error(message);
      return 0;
    }
  };
}

export function getNewsDetailAction(id) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: NEWS_DETAIL.LOADING });
      res = await api(`${APIS.common}/${id}`);

      const { success, data } = res.data;

      if (success === "true") {
        dispatch({ type: NEWS_DETAIL.SUCCESS, payload: data.data });
      } else {
        dispatch({ type: NEWS_DETAIL.ERROR });
      }
    } catch ({ message }) {
      dispatch({ type: NEWS_DETAIL.ERROR });
      console.error(message);
      return 0;
    }
  };
}

export function postNewsAction(formdata, goBackHandler, toast) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: ADD_NEWS.LOADING });
      res = await api(APIS.common, "POST", formdata, { file: true });

      const { success, data } = res.data;

      if (success === "true") {
        dispatch({ type: ADD_NEWS.SUCCESS });
        toast({ message: "News successfully Added", type: "success" });
        goBackHandler();
      } else {
        dispatch({ type: ADD_NEWS.ERROR });
        toast({ message: data.message, type: "error" });
      }
    } catch ({ message }) {
      dispatch({ type: ADD_NEWS.ERROR });
      console.error(message);
      toast({ message: "Error Adding News", type: "error" });
      return 0;
    }
  };
}

export function editNewsAction(id, body, photoFormdata, goBackHandler, toast) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: EDIT_NEWS.LOADING });
      res = await api(`${APIS.common}/${id}`, "PATCH", body);

      const { success, data } = res.data;

      if (success === "true") {
        let photoRes = await api(
          `${APIS.common}/image/${id}`,
          "PATCH",
          photoFormdata,
          { file: true },
        );
        const { success: photoSuccess, data: photoData } = photoRes.data;
        if (photoSuccess === "true") {
          dispatch({ type: EDIT_NEWS.SUCCESS });
          toast({ message: "News successfully edited", type: "success" });
          goBackHandler();
        } else {
          dispatch({ type: EDIT_NEWS.ERROR });
          toast({ message: photoData.message, type: "error" });
        }
      } else {
        dispatch({ type: EDIT_NEWS.ERROR });
        toast({ message: data.message, type: "error" });
      }
    } catch ({ message }) {
      dispatch({ type: EDIT_NEWS.ERROR });
      console.error(message);
      toast({ message: "Error editing News", type: "error" });
      return 0;
    }
  };
}

export function deleteNewsAction(id, toast, page) {
  return async function (dispatch) {
    let res;
    try {
      dispatch({ type: DELETE_NEWS.LOADING });
      res = await api(`${APIS.common}/${id}`, "DELETE");

      const { success, data } = res.data;

      if (success === "true") {
        dispatch({ type: DELETE_NEWS.SUCCESS });
        toast({ message: "News successfully deleted", type: "success" });
        dispatch(getNewsAction(page));
      } else {
        dispatch({ type: DELETE_NEWS.ERROR });
        toast({ message: data.message, type: "error" });
      }
    } catch ({ message }) {
      dispatch({ type: DELETE_NEWS.ERROR });
      toast({ message: "Error Deleting News", type: "error" });
      console.error(message);
      return 0;
    }
  };
}
