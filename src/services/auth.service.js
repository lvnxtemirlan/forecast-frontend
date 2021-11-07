import axios from "axios";
import authHeader from './auth-header';
// axios.defaults.baseURL = API_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class AuthService {
    login(username, password) {
        console.log(username, password);
        return axios
            .post(REACT_APP_API_URL + "token/", {
                username,
                password
            })
            .then(response => {
                console.log(response.data);
                console.log(JSON.stringify(response.data.refresh), 'res');
                if (response.data.access) {

                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("refresh", response.data.refresh);
                }
                console.log(response.data.accessToken);
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(REACT_APP_API_URL + "signup", {
            username,
            email,
            password
        });
    }

    refresh() {
        // console.log(localStorage.getItem("user"), "access");
        // console.log(localStorage.getItem("refresh"), "refresh");
        axios
            .post(
                REACT_APP_API_URL + "token/refresh/", {
                "refresh": localStorage.getItem("refresh")
            }
            )
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data));
            })
    }

    getCurrentUser() {
        return axios
            .get(REACT_APP_API_URL + 'auth/profile/', { headers: authHeader() });
    }
}

export default new AuthService();