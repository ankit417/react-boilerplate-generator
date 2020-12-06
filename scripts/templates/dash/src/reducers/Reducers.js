import { combineReducers } from "redux";
import { loginReducer } from "./Login.reducer";
import { newsReducer } from "./News.reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  news: newsReducer,
});

export default rootReducer;
