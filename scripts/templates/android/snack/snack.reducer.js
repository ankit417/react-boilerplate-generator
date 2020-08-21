import { 
  OPEN_SNACK,
  CLOSE_SNACK,
} from "./snack.actionTypes";

const initialState = {
  modalVisible: false,
  message: "",
  type: "success"
};

export function snackReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case OPEN_SNACK:
      return {...state, modalVisible: true, message: payload.message, type: payload.type};

    case CLOSE_SNACK:
      return {...state, modalVisible: false};

    default: 
      return state;
  }
}