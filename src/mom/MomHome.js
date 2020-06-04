import React from "react"
import { COPY, PRICING_COPY } from "./momConstants"
import "./momHome.css"
import card1 from "./cardAssets/card1.jpeg"
import card3 from "./cardAssets/card3.jpeg"
import card5 from "./cardAssets/card5.jpeg"
import card6 from "./cardAssets/card6.jpeg"
import card16 from "./cardAssets/card16.jpeg"
import card20 from "./cardAssets/card20.jpeg"

const images = [
  {
    id: 1,
    src: card1,
    alt: "Birthday",
    text: "Birthday",
    display: "horizontal",
  },
  {
    id: 2,
    src: card5,
    alt: "Blank Art Cards",
    text: "Blank Art Cards",
    display: "vertical",
  },
  {
    id: 3,
    src: card20,
    alt: "Sympathy",
    text: "Sympathy",
    display: "horizontal",
  },
  { id: 4, src: card6, alt: "Baby", text: "Baby", display: "horizontal" },
  {
    id: 5,
    src: card16,
    alt: "Holiday",
    text: "Holiday",
    display: "vertical",
  },
  {
    id: 6,
    src: card3,
    alt: "Anniversary/Marriage",
    text: "Anniversary/Marriage",
    display: "horizontal",
  },
]

class Mom extends React.Component {
  renderPictures = () => {
    console.log(card1)
    const { onScreenClick } = this.props
    return images.map((item) => (
      <div className="momhome-img-container">
        <div className="home-card-text">{item.text}</div>
        <img
          src={item.src}
          alt={item.alt}
          className={`${
            item.display === "vertical"
              ? "home-card-img-vert"
              : "home-card-img-horiz"
          } skewedshadow`}
          onClick={() => onScreenClick(item.text)}
        />
      </div>
    ))
  }

  renderCopy = () => {
    return COPY.map((item) => (
      <div key={item.length} className="momhome-copy">
        {item}
      </div>
    ))
  }

  renderPricing = () => {
    return PRICING_COPY.map((item) => (
      <div key={item.length} className="momhome-copy">
        {item}
      </div>
    ))
  }

  render() {
    return (
      <div className="momhome-container">
        <div className="momhome-copy-container">
          {/* <div>{this.renderCopy()}</div>
          <div>{this.renderPricing()}</div> */}
        </div>
        <div className="momhome-imgs-container">{this.renderPictures()}</div>
      </div>
    )
  }
}

export default Mom
