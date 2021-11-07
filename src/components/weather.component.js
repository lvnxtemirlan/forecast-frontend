import React, { Component } from "react";

import UserService from "../services/user.service";
import MapService from '../services/maps.service';
import ApiWeatherService from '../api/weather.service';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import authService from "../services/auth.service";
import swal from 'sweetalert';
import { useParams, withRouter } from "react-router";

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            is_deleted: false,
            content: "{}"
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        MapService.retrieveWeather(id).then(
            response => {
                this.setState({
                    id: id,
                    content: JSON.stringify(response.data)
                });
            },
            error => {
                console.log(error.response.status, 'status')
                if (error.response.status == 401) {

                    authService.refresh();
                    // window.location.reload();
                }
                // this.setState({
                //     content:
                //         (error.response && error.response.data) ||
                //         error.message ||
                //         error.toString()
            });
    }

    deleteData(pk) {
        swal({
            title: "Вы хотите удалить?",
            text: "Удаленная погода попадет в корзину",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                MapService.deleteWeather(pk).then(
                    response => {
                        if (response.status == 200) {
                            swal({
                                title: "Успешно удален!",
                                icon: "success",
                            }).then(() => {
                                // window.location.reload();
                            })
                        }

                    }
                )
            }
        })

    }


    retrieveWeather(pk) {
        this.props.history.push("/home/" + pk + "/");
    }

    render() {
        if (this.state.id != 0) {
            console.log(this.state.id, "CONSOLE LOG IDsss");
            // console.log(this.state.content)
            const body = JSON.parse(this.state.content);
            const weatherss = body['weathers'];
            console.log(weatherss, typeof (weatherss));
            var data = [];
            weatherss.map(value => {
                var weather = JSON.parse(value.body);
                var s = new Date(weather.dt + 21600).toLocaleTimeString("kz-KZ")
                console.log(weather)
                data.push(
                    <tr class='clickable-row' data-href="/">
                        <td>{weather.weather[0].description}</td>
                        <td>{(weather.main.temp - 273.15).toFixed(2)} ℃</td>
                        <td>{(weather.main.temp_max - 273.15).toFixed(2)} ℃</td>
                        <td>{(weather.main.temp_min - 273.15).toFixed(2)} ℃</td>
                        <td>{weather.main.humidity}</td>
                        <td>{weather.main.pressure}</td>
                        <td>{weather.main.sea_level}</td>
                        <td>{weather.wind.speed} м/с</td>
                        <td>{s}</td>
                    </tr>

                )
            })
        }





        return (
            <div className="container" >
                {/* <header className="jumbotron"> */}
                <table class="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Погода</th>
                            <th scope="col">Температура</th>
                            <th scope="col">Макс.темп</th>
                            <th scope="col">Мин.темп</th>
                            <th scope="col">Влажность</th>
                            <th scope="col">Давление</th>
                            <th scope="col">Уровень море</th>
                            <th scope="col">Скорость ветра</th>
                            <th scope="col">Время</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
                {/* </header> */}
            </div>

        );
    }
}

export default withRouter(Weather);