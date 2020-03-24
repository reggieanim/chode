import axios from "axios";

export const LOGIN = "LOGIN";
export const LOGGING_IN = "LOGGING_IN";

export const login = (email, password) => {
  return dispatch => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    let body = {
      email: email,
      password: password
    };
    dispatch({
      type: LOGGING_IN
    });
    axios
      .post("http://localhost:8080/login", body, axiosConfig)
      .then(function(response) {
        dispatch({
          type: LOGIN,
          payload: response
        });
      });
  };
};
