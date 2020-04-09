import axios from 'axios'


export const login = (email, password) => {

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

    return axios
        .post("http://localhost:8080/login", body, axiosConfig)
        

};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt",JSON.stringify(data))
      next()
    }
  }


 export const signUp = (email, name, password) => {

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",

      }
    };
    let body = {
      email: email,
      name: name,
      password: password
    };


    return axios.post("http://localhost:8080/signup", body, axiosConfig)
     

  }