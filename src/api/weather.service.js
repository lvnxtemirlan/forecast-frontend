import axios from 'axios';


class ApiWeatherService {
    getWeather(lat, long) {
        return axios({
            method: "get",
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=f7f03bd3b4fb6ed17842d476c56af497",
        })
    }
}

export default new ApiWeatherService();