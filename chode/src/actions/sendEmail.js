import axios from "axios";

export const SENT_EMAIL = "SENT_EMAIL";
export const SENDING_EMAIL = "SENDING_EMAIL";

export const sendEmail = (email, name, message) => {
  return dispatch => {
   
    let body = {
      email: email,
      name: name,
      message: message
    };
    dispatch({
      type: SENDING_EMAIL
    });
    axios
      .post("http://localhost:8080/contact", body)
      .then(function(response) {
        dispatch({
          type: SENT_EMAIL,
          payload: response
        });
      });
  };
};
