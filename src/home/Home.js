import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../common/Card"
import HomeFooter from "./HomeFooter"
import BBall from "../basketball/BBall"
import Line from "./Line"

import "./home.css"
import { HOME_TEXTA, HOME_TEXTB, HOME_TEXTC, HOME_TEXTD } from "./copy"

class Home extends React.Component {
  state = {
    lineShown: 0,
  }

  cardHover = (val) => {
    if (this.state.lineShown >= val) return null
    this.setState({ lineShown: val })
  }
  render() {
    function cards() {
      const data = [
        { icon: "id-badge", css: "card-left", text: HOME_TEXTA },
        { icon: ["fab", "linkedin"], css: "card-right", text: HOME_TEXTB },
        { icon: "envelope", css: "card-left", text: HOME_TEXTC },
        { icon: "laptop", css: "card-right", text: HOME_TEXTD },
      ]
      return data.map((item, i) => (
        <div className={item.css}>
          <Card>
            <div className="inner-card" onmouseover={() => this.cardHover(i)}>
              {item.text.map((t) => (
                <div className="home-card-text">{t}</div>
              ))}
            </div>
          </Card>
          {/* <Line start={i % 2 === 0 ? "left" : "right"} /> */}
        </div>
      ))
    }
    return (
      <div className="home-container">
        <BBall />
        <div className="home-content">{cards()}</div>
        <HomeFooter>
          <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
          <FontAwesomeIcon icon={["fab", "linkedin"]} />
          <FontAwesomeIcon icon="envelope" />
          <FontAwesomeIcon icon="laptop" />
        </HomeFooter>
      </div>
    )
  }
}

export default Home
