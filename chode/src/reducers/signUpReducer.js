import { SIGN_UP, SIGNING_UP } from "../actions/signUp";

const INITIAL_STATE = { loading: false, response: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNING_UP:
      return { ...state, loading: true };

    case SIGN_UP:
      return { ...state, loading: false, response: action.payload };

    default:
      return state;
  }
};