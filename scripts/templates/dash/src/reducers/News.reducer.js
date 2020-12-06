import {
  NEWS,
  ADD_NEWS,
  DELETE_NEWS,
  NEWS_DETAIL,
  EDIT_NEWS,
} from "../actions/Actions";

const initalState = {
  listLoader: false,
  listCount: null,
  list: [],
  addLoader: false,
  deleteLoader: false,
  editLoader: false,
  detailLoader: false,
  detail: null,
};

export function newsReducer(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    // GET
    case NEWS.LOADING:
      return {
        ...state,
        listLoader: true,
      };
    case NEWS.SUCCESS:
      return {
        ...state,
        listLoader: false,
        listCount: payload.total,
        list: payload.rows,
      };
    case NEWS.ERROR:
      return {
        ...state,
        listLoader: false,
      };

    // NEWS_DETAIL
    case NEWS_DETAIL.LOADING:
      return {
        ...state,
        detailLoader: true,
        detail: null,
      };
    case NEWS_DETAIL.SUCCESS:
      return {
        ...state,
        detailLoader: false,
        detail: payload,
      };
    case NEWS_DETAIL.ERROR:
      return {
        ...state,
        detailLoader: false,
      };

    case ADD_NEWS.LOADING:
      return {
        ...state,
        addLoader: true,
      };
    case ADD_NEWS.SUCCESS:
      return {
        ...state,
        addLoader: false,
      };
    case ADD_NEWS.ERROR:
      return {
        ...state,
        addLoader: false,
      };

    // EDIT_NEWS
    case EDIT_NEWS.LOADING:
      return {
        ...state,
        editLoader: true,
      };
    case EDIT_NEWS.SUCCESS:
      return {
        ...state,
        editLoader: false,
      };
    case EDIT_NEWS.ERROR:
      return {
        ...state,
        editLoader: false,
      };

    case DELETE_NEWS.LOADING:
      return {
        ...state,
        deleteLoader: true,
      };
    case DELETE_NEWS.SUCCESS:
      return {
        ...state,
        deleteLoader: false,
      };
    case DELETE_NEWS.ERROR:
      return {
        ...state,
        deleteLoader: false,
      };

    default:
      return state;
  }
}
