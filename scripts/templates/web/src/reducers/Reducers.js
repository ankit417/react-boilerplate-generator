import { combineReducers } from "redux";
import { sampleReducer } from "./Sample.reducer";

const rootReducer = combineReducers({
  samples: sampleReducer
});

export default rootReducer;