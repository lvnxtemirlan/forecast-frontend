import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {
                "noting": 'fasdfsdf'
            }
        };
    }

    componentDidMount() {
        AuthService.getCurrentUser().then(
            response => {
                if (response.status.code == 401) {
                    AuthService.refresh();
                    window.location.reload();
                }
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        const { content } = this.state;
        console.log(content);
        console.log("current user");
        // const [x, setX] = useState(false);

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        {/* <strong>{currentUser.username}</strong> Profile */}
                    </h3>
                </header>
                <p>
                    <strong>Логин:</strong>{" "}
                    {content.username}
                    {/* {content.email} */}
                </p>
                <p>
                    <strong>Личное имя:</strong>{" "}
                    {content.first_name}
                </p>
                <p>
                    <strong>Фамилия:</strong>{" "}
                    {content.last_name}
                </p>
                <p>
                    <strong>Почта:</strong>{" "}
                    {content.email}
                </p>
                <p>
                    <strong>Сотрудник канцелярий:</strong>{" "}
                    <input type="checkbox" checked={content.is_staff} />
                </p>
                {/* <strong>Authorities:</strong> */}
                {/* <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul> */}
            </div>
        );
    }
}