import { combineReducers } from "redux";
import sendEmailReducer from "./sendEmailReducer";

export default combineReducers({
  mailReducer: sendEmailReducer
});
