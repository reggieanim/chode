import { combineReducers } from "redux";
import sendEmailReducer from "./sendEmailReducer";
import signUpReducer from './signUpReducer'
import loginReducer from './loginReducer'
import authReducer from './authenticateReducer'

export default combineReducers({
  mailReducer: sendEmailReducer,
  signUpReducer: signUpReducer,
  loginReducer: loginReducer,
  authReducer: authReducer
});
