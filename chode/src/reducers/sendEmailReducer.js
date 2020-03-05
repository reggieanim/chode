import { SENT_EMAIL, SENDING_EMAIL } from "../actions/sendEmail";

const INITIAL_STATE = { loading: false, response: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SENDING_EMAIL:
      return { ...state, loading: true };

    case SENT_EMAIL:
      return { ...state, loading: false, response: action.payload };

    default:
      return state;
  }
};
