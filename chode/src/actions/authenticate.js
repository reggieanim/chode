export const AUTHENTICATE = "AUTHENTICATE"

export const authenticate = (data) => {
    return dispatch => {
        if(typeof window != "undefined") {
            localStorage.setItem("jwt", JSON.stringify(data))
           return { type: AUTHENTICATE, payload: "authenticated"}
            } 
        }
    };