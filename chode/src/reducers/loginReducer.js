import { LOGIN, LOGGING_IN } from "../actions/login";

const INITIAL_STATE = { loading: false, response: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, loading: true };

    case LOGIN:
      return { ...state, loading: false, response: action.payload };

    default:
      return state;
  }
};
