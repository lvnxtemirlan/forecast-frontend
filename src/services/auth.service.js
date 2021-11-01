import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8000/api/v1/";
// axios.defaults.baseURL = API_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class AuthService {
    login(username, password) {
        console.log(username, password);
        return axios
            .post(API_URL + "token/", {
                username,
                password
            })
            .then(response => {
                console.log(response.data);
                if (response.data.access) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                console.log(response.data.accessToken);
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    refresh() {
        return axios
            .post(
                API_URL + "token/refresh/", {
                "access": localStorage.getItem("access"),
                "refresh": localStorage.getItem("refresh")
            }
            )
            .then(response => {
                console.log(response.data);
            })
    }

    getCurrentUser() {
        console.log(API_URL + `auth/profile/`);
        return axios
            .get(API_URL + 'auth/profile/', { headers: authHeader() });
    }
}

export default new AuthService();