import React, { Component } from "react";

import UserService from "../services/user.service";
import MapService from '../services/maps.service';
import ApiWeatherService from '../api/weather.service';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import authService from "../services/auth.service";
import swal from 'sweetalert';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_deleted: false,
            content: {}
        };
    }

    componentDidMount() {
        MapService.getWeather(this.state.is_deleted).then(
            response => {
                console.log(response.data, 'response');
                this.setState({
                    content: response.data
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


    getApiWeather(content) {

        ApiWeatherService.getWeather(content.coordinates.latitude, content.coordinates.longitude).then(
            response => {
                if (response.status == 200) {
                    MapService.postWeather(content.id, JSON.stringify(response.data))
                    swal({
                        title: "Погода записана",
                        // text: "Удаленная погода попадет в корзину",
                        icon: "success",
                    }).then((willDelete) => {
                        this.props.history.push('home/' + content.id);
                    })
                }
            }
        )



    }

    retrieveWeather(pk) {
        this.props.history.push("/home/" + pk);
    }

    render() {
        var data = [];
        for (var i = 0; i < this.state.content.count; i++) {
            var content = this.state.content.results;
            data.push(<tr class='clickable-row' data-href="/">
                <td>{content[i].name.ru}</td>
                <td>{content[i].coordinates.latitude.toFixed(3)}</td>
                <td>{content[i].coordinates.longitude.toFixed(3)}</td>
                <th scope="col"><button type="button" class="btn btn-success" onClick={this.getApiWeather.bind(this, content[i])}>Отправить запрос</button></th>
                <th scope="col"><button type="button" class="btn btn-primary" onClick={this.retrieveWeather.bind(this, content[i].id)}>Посмотреть</button></th>
                <th scope="col"><button type="button" class="btn btn-danger" onClick={this.deleteData.bind(this, content[i].id)}>Удалить</button></th>
            </tr>)
        }


        return (
            <div className="container">
                <header className="jumbotron">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Город</th>
                                <th scope="col">Широта</th>
                                <th scope="col">Долгота</th>
                                <th scope="col">Узнать погоду</th>
                                <th scope="col">Обзор</th>
                                <th scope="col">Удалить</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                        <tfoot>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Количество: {this.state.content.count}</th>
                        </tfoot>
                    </table>
                </header>
            </div>

        );
    }
}

export default Home;