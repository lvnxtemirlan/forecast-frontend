import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import {
  PlacesAutocomplete,
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import MapService from '../services/maps.service';
import authService from "../services/auth.service";
import swal from 'sweetalert';

const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)


const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// const containerStyle = {
//   position: 'relative',  
//   width: '70%',
//   height: '70%'
// }

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 51.169392,
        lng: 71.449074,
      },
      markerPosition: {
        lat: 0,
        lng: 0

      }
    };
  }

  onMarkerClick = (props, marker, e) => {
    // console.log(marker, 'click');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (mapProps, map) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        mapCenter: {
          lat: map.center.lat(),
          lng: map.center.lng()
        },
        inputValue: ''
      })
    }
  };

  centerMoved = (mapProps, map) => {
    this.setState({
      mapCenter: {
        lat: map.center.lat(),
        lng: map.center.lng()
      }
    })
  }

  onMouseover = (mapProps, map) => {
    console.log(map);
    this.setState({
      selectedPlace: mapProps,
      activeMarker: mapProps.marker,
      showingInfoWindow: true,
      mapCenter: {
        lat: map.position.lat(),
        lng: map.position.lng()
      }
    })
  }
  sendCity = (props) => {
    var name = this.state.inputValue;
    var lat = this.state.mapCenter.lat;
    var lng = this.state.mapCenter.lng;
    console.log(name, lat, lng)
    MapService.postCity(name, lat, lng).then(
      () => {
        this.props.history.push("/home");
        window.location.reload();
      },
      error => {

        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        swal({
          title: "Добавьте наименование",
          // text: "Удаленная погода попадет в корзину",
          icon: "warning",
        }).then((willDelete) => {
          // this.props.history.push('home/' + content.id);
        })

        // this.setState({
        //   loading: false,
        //   message: resMessage
        // });
      }
    );;

  }

  updateInputValue = (props) => {
    this.setState({
      inputValue: props.target.value
    });
  }

  render() {
    return (
      <main role="main" class="container">
        <div class="jumbotron-fluid">
          <div class="jumbotron jumbotron-fluid" style={{
            "margin-top": 20,
            "margin-bottom": 20
          }}>
            <div class="container">
              <input type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                placeholder="Наименование"
                value={this.state.inputValue}
                onChange={this.updateInputValue}></input>
              <div class="input-group" style={{
                "margin-bottom": 10
              }}>
                <input type="text" aria-label="First name" class="form-control" placeholder="Latitude" value={this.state.mapCenter.lat}></input>
                <input type="text" aria-label="Last name" class="form-control" placeholder="Longitude" value={this.state.mapCenter.lng}></input>
                <button type="button" class="btn btn-success" onClick={this.sendCity}>Добавить город</button>
              </div>
            </div>
          </div>
          <div id="googleMap" class="col"
          // style={{
          //     position: 'relative', 
          //     width: '80%',
          //     height: '50%'
          //   }}
          >
            <Map google={this.props.google}
              style={{
                position: 'relative',
                width: '80%',
                height: '50%'
              }}
              // onClick={this.onMapClicked}
              initialCenter={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
              }}
            // center={{
            //   lat: this.state.mapCenter.lat,
            //   lng: this.state.mapCenter.lng
            // }}
            // onDragend={this.centerMoved}
            >
              <Marker
                draggable={true}
                onClick={this.onMarkerClick}
                name={'Current location'}
                onMouseover={this.onMouseover}
              />

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>


      </main >
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD3eJCzMm3h3SHO3TyeM3CdRRTbpf8jP9Y"),
  // apiKey: ("YOUR_GOOGLE_API_KEY_GOES_HERE"),
  LoadingContainer: LoadingContainer
})(MapContainer)