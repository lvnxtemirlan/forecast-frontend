import axios from 'axios';
import authHeader from './auth-header';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class MapService {
    postCity(name, lat, long) {
        return axios({
            method: "post",
            url: REACT_APP_API_URL + 'weather/',
            data: {
                name: {
                    ru: name,
                    kk: '',
                    en: ''
                },
                coordinates: {
                    longitude: long,
                    latitude: lat
                }

            },
            headers: authHeader()
        })
    }

    postWeather(weather_id, body) {
        return axios({
            method: "post",
            url: REACT_APP_API_URL + 'weather/generate_weather/',
            headers: authHeader(),
            data: {
                weather: weather_id,
                body: body
            }
        })
    }

    getWeather(is_deleted) {
        console.log(localStorage.getItem("refresh"), "refresh");
        return axios({
            method: "get",
            url: REACT_APP_API_URL + "weather/",
            headers: authHeader(),
            params: {
                "is_deleted": is_deleted
            }

        })
    }

    deleteWeather(pk) {
        return axios({
            method: "put",
            url: REACT_APP_API_URL + "weather/" + pk + "/",
            headers: authHeader(),
            data: {
                is_deleted: true
            }
        })
    }

    recoverWeather(pk) {
        return axios({
            method: "put",
            url: REACT_APP_API_URL + "weather/" + pk + "/",
            headers: authHeader(),
            data: {
                is_deleted: false
            }
        })
    }

    retrieveWeather(pk) {
        return axios({
            method: "get",
            url: REACT_APP_API_URL + 'weather/' + pk + "/",
            headers: authHeader(),
        })
    }

    getUserBoard() {
        return axios.get(REACT_APP_API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(REACT_APP_API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(REACT_APP_API_URL + 'admin', { headers: authHeader() });
    }
}

export default new MapService();