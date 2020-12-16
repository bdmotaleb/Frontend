import {setAuthorization} from "./general";

export function login(credentials) {
  return new Promise((res, rej) => {
    axios.post('http://127.0.0.1:8000/api/auth/login', credentials)
      .then((response) => {
        setAuthorization(response.data.token);
        res(response.data);
      })
      .catch((err) => {
        rej("These credentials do not match our records.");
      })
  })
}

export function getLocalUser() {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}
