import {AUTHENTICATE } from "../actions/authenticate";

const INITIAL_STATE = { user: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case AUTHENTICATE:
      return { ...state,  user: action.payload };

    default:
      return state;
  }
  }