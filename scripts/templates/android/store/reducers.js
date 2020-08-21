import {combineReducers} from 'redux';
import {snackReducer} from '../snack/snack.reducer';

export const rootReducer = combineReducers({
  snack: snackReducer,
});
