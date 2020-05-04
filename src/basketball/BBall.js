import React from "react"
import Bouncing from './Bouncing';

import './bball.css';

class BBall extends React.Component {
  state = {
  };

  render() {
    return (
      <div className="bball-container">
        <h1 className="header">Basketball stuff coming soon</h1>
        <div className="bounce-container" />
        <Bouncing />
      </div>
    );
  }
}

export default BBall