import React, { Component } from "react";
class Map extends Component {
  render() {
    return (
      <div>
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={
            "pk.eyJ1IjoicmVkYmVhcjE0OCIsImEiOiJjanpvZXcxam8wZWQxM2NvNWFiY2s2bjhoIn0.rbiXBEYAHOeH47-rsflf8Q"
          }
          mapStyle="mapbox://styles/redbear148/cjzqxhvos4wzc1cp5581r78pz"
          onViewportChange={viewport => this.setState({ viewport })}
          // {process.env.REACT_APP_MAPBOX_TOKEN}} does not work. Why?
          //below is the skin I chose for the map. copy the url of the style and paste it in the below code.
        >
          {churchData.features.map(church => (
            <Marker
              key={church.properties.CHURCH_ID}
              latitude={church.geometry.coordinates[1]}
              longitude={church.geometry.coordinates[0]}
            >
              <button id="marker-btn" onClick={this.togglePopup.bind(this)}>
                <img src="./images/church.png" alt="church icon" />
              </button>
            </Marker>
          ))}
          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup.bind(this)} />
          ) : null}

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
        </ReactMapGl>
      </div>
    );
  }
}
export default Map;
