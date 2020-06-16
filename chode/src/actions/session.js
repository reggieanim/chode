import axios from "axios";

export const createSession = (e) => {
    e.preventDefault()
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return axios
    .post("http://localhost:8080/session_create", axiosConfig)
    
};
