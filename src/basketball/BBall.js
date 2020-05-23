import React from "react"
import Bouncing from "./Bouncing"

import "./bball.css"

class BBall extends React.Component {
  state = {}

  render() {
    return (
      <div className="header-container">
        <div className="name-style">Marc Sal</div>
        <Bouncing />
      </div>
    )
  }
}

export default BBall
