import { LOGIN, PASSWORD } from "../actions/Actions";

const initalState = {
  loading: false,
  error: false,

  passwordLoader: false,
};

export function loginReducer(state = initalState, action) {
  const { type } = action;

  switch (type) {
    case LOGIN.LOADING:
      return { ...state, loading: true, error: false };
    case LOGIN.SUCCESS:
      return { ...state, loading: false, error: false };
    case LOGIN.ERROR:
      return { ...state, loading: false, error: true };

    // PASSWORD
    case PASSWORD.LOADING:
      return {
        ...state,
        passwordLoader: true,
      };
    case PASSWORD.SUCCESS:
      return {
        ...state,
        passwordLoader: false,
      };
    case PASSWORD.ERROR:
      return {
        ...state,
        passwordLoader: false,
      };
    default:
      return state;
  }
}
