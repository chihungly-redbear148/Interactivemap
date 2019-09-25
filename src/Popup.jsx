import React, { Component } from "react";
import "./popup.css";
import * as churchData from "./data.js/montrealplaces.json";

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="pop-inner">
          {/* <h1>{this.props.text}</h1> */}
          {/* <button onClick={this.props.closePopup}>close me</button> */}
          <h2>test</h2>
        </div>
      </div>
    );
  }
}

export default Popup;
