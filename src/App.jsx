import React, { Component } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import * as Data from "./data.js/montrealplaces.json";
import Popup from "./Popup.jsx";
import "./main.css";
import "./popup.css";
// import Mapbox from "mapbox";
import { Layer } from "react-mapbox-gl";
import Routes from "./Routes.jsx";

// let mapbox = new Mapbox(MAPBOX_TOKEN);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:
        "pk.eyJ1IjoicmVkYmVhcjE0OCIsImEiOiJjanpvZXcxam8wZWQxM2NvNWFiY2s2bjhoIn0.rbiXBEYAHOeH47-rsflf8Q",
      viewport: {
        width: 641,
        height: 657,
        latitude: 45.50884,
        longitude: -73.58781,
        zoom: 12,
        showPopup: false,
        setSelectedChurch: false,
        selectedChurch: false,
        directions: null,
        steps: true
      },
      user: { latitude: 0, longitude: 0 },
      startingDest: {
        latitude: 45.460574,
        longitude: -73.63424
      }
    };
  }

  handleStartingDestinationChange = event => {
    console.log("Destination start", event.target.value);
    this.setState({ startingDest: event.target.value });
  };
  handleEndingDestinationChange = event => {
    console.log("Destination ends", event.target.value);
    this.setState({ endingDest: event.target.value });
  };

  componentDidMount() {
    // console.log("hello");
    navigator.geolocation.getCurrentPosition(async position => {
      let res = await fetch(
        // `https://api.mapbox.com/directions/v5/mapbox/walking/-73.580809%2C$45.494741%3B${this.state.destination.longitude}%2C${this.state.destination.latitude}.json?access_token=${this.state.token}&geometries=geojson`
        `https://api.mapbox.com/directions/v5/mapbox/walking/-73.637811%2C45.497479%3B-73.570305%2C45.500464.json?access_token=${this.state.token}&geometries=geojson`
        // steps=true&geometries=geojson&// add to get steps?
        // `https://api.mapbox.com/directions/v5/mapbox/walking/${position.coords.longitude}%2C${position.coords.latitude}%3B${this.state.destination.longitude}%2C${this.state.destination.latitude}.json?access_token=${this.state.token}&geometries=geojson`
      );
      let resBody = await res.json();
      console.log(resBody);
      this.setState({
        user: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        routes: resBody.routes[0].geometry.coordinates
      });
    });
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Starting destination:
          <input type="text" onChange={this.handleStartingDestinationChange} />
          Ending destination:
          <input type="text" onChange={this.handleEndingDestinationChange} />
          <input type="submit" />
        </form>
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={this.state.token}
          mapStyle="mapbox://styles/redbear148/cjzoj8pov0eg71cqiqjhgczwj"
          onViewportChange={viewport => this.setState({ viewport })}
          // {process.env.REACT_APP_MAPBOX_TOKEN}} does not work. Why?
          //below is the skin I chose for the map. copy the url of the style and paste it in the below code.
        >
          {Data.features.map(place => {
            let icon = "";
            if (place.type === "Church") {
              icon = "./images/church.png";
            }
            if (place.type === "Park") {
              icon = "./images/park.png";
            }
            if (place.type === "Market") {
              icon = "./images/market.png";
            }
            if (
              place.latitude &
              (place.longitude === this.state.user.latitude) &
              this.state.user.longitude
            ) {
              window.alert("New message");
            }

            return (
              <Marker
                key={place.properties.FACILITYID}
                latitude={place.geometry.coordinates[1]}
                longitude={place.geometry.coordinates[0]}
              >
                <button id="marker-btn" onClick={this.togglePopup.bind(this)}>
                  <img src={icon} alt="icon" />
                </button>
              </Marker>
            );
          })}
          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup.bind(this)} />
          ) : null}

          <Marker
            latitude={this.state.user.latitude}
            longitude={this.state.user.longitude}
          >
            <button id="marker-btn" onClick={this.togglePopup.bind(this)}>
              <img src="./images/walking.png" alt="icon" />
            </button>
          </Marker>
          {/* {selectedChurch ? (
            <Popup
              latitude={selectedChurch.geometry.coordinates[1]}
              longitude={selectedChurch.geometry.coordinates[0]}
            >
              <div>
                <h2>{selectedChurch.properties.NAME}</h2>
                <p>{selectedChurch.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          ) : null} */}
          {/* {this.state && (
            <Layer
              type="line"
              layout={{ "line-cap": "round", "line-join": "round" }}
              paint={{ "line-color": "#4790E5", "line-width": 12 }}
            ></Layer>
          )} */}

          <Routes points={this.state.routes} />
        </ReactMapGl>
      </div>
    );
  };
}
export default App;
