import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
// import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import MapContainer from "./components/maps.component";
import Bucket from "./components/bin.component";
import Weather from "./components/weather.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }



  componentDidMount() {
    const user = AuthService.getCurrentUser().then(
      response => {
        if (response.status == 401) {
          AuthService.refresh();
          window.location.reload();
        }
      }
    );

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            QARAP QALMA
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Профиль
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Мои города
              </Link>
            </li>



            <li className="nav-item">
              <Link to={"/map"} className="nav-link">
                Добавить город
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/bin"} className="nav-link">
                Корзина
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Выйти
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        {/* <div className="container mt-0"> */}
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/register" component={Register} /> */}
          <Route exact path="/profile" component={Profile} />

          <Route exact path="/map" component={MapContainer} />
          <Route path="/bin" component={Bucket} />
          <Route path="/home/:id" component={Weather} />
          {/* <Route path="/admin" component={BoardAdmin} /> */}
        </Switch>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
