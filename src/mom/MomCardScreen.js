import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./momCardScreen.css"

class MomCardScreen extends React.Component {
  renderCards = () => {
    const { screen } = this.props

    return screen.images.map((img, i) => {
      const alt = `${screen.screen}${i}`
      return (
        <div key={alt} className="momcard-img-container">
          <img src={img} alt={alt} className="card-img" />
        </div>
      )
    })
  }
  render() {
    console.log("this", this.props)
    return (
      <div className="cardscreen-container">
        <div className="cardscreen-toprow">
          <FontAwesomeIcon
            icon="chevron-left"
            size="2x"
            onClick={() => this.props.backClicked()}
          />
          <div className="card-category">{this.props.screen.screen}</div>
          <div />
        </div>
        <div className="momcard-imgs-container">{this.renderCards()}</div>
      </div>
    )
  }
}

export default MomCardScreen
