import React, { Component } from "react";

import UserService from "../services/user.service";
import MapService from '../services/maps.service'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import authService from "../services/auth.service";
import swal from 'sweetalert';

class Bucket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_deleted: true,
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

    recoverData(pk) {
        swal({
            title: "Вы хотите восстановить погоду?",
            text: "Восстановленная погода вернется в актуальные данные",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willRecover) => {
            if (willRecover) {
                MapService.recoverWeather(pk).then(
                    response => {
                        console.log(response.status);
                        if (response.status == 200) {
                            swal({
                                title: "Успешно восстановлен!",
                                icon: "success",
                            }).then(() => {
                                window.location.reload();
                            })
                        }

                    }
                )
            }
        })

    }

    render() {
        var data = [];
        for (var i = 0; i < this.state.content.count; i++) {
            var content = this.state.content.results;
            data.push(<tr class='clickable-row' data-href="/">
                <td>{content[i].name.ru}</td>
                <td>{content[i].coordinates.latitude.toFixed(3)}</td>
                <td>{content[i].coordinates.longitude.toFixed(3)}</td>
                <th scope="col"><button type="button" class="btn btn-secondary" onClick={this.recoverData.bind(this, content[i].id)}>Восстановить</button></th>
            </tr>)
        }


        return (
            <div className="container">
                <header className="jumbotron">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Город</th>
                                <th scope="col">Широта</th>
                                <th scope="col">Долгота</th>
                                <th scope="col"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                        <tfoot>
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

export default Bucket;