import axios from "axios";

export const SIGN_UP = "SIGN_UP";
export const SIGNING_UP = "SIGNING_UP";

export const signUp = (email, name, password) => {
  return dispatch => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    let body = {
      email: email,
      name: name,
      password: password
    };
    dispatch({
      type: SIGNING_UP
    });
    axios
      .post("http://localhost:8080/signup", body, axiosConfig)
      .then(function(response) {
        dispatch({
          type: SIGN_UP,
          payload: response
        });
      });
  };
};
