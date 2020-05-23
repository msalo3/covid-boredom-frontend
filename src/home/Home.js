import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../common/Card"
import HomeFooter from "./HomeFooter"

import "./home.css"
import { TEXTA, TEXTB, TEXTC, TEXTD, TEXTE } from "./copy"

class Home extends React.Component {
  render() {
    function cards() {
      const data = [
        { icon: ["fab", "github"], css: "card-left" },
        { icon: ["fab", "linkedin"], css: "card-right" },
        { icon: "envelope", css: "card-left" },
        { icon: "laptop", css: "card-right" },
        { icon: "laptop", css: "card-left" },
      ]
      return data.map((item, i) => (
        <div className={item.css}>
          <Card>
            <div className="inner-card">
              {TEXTA}
              <FontAwesomeIcon icon={item.icon} size="2x" />
            </div>
          </Card>
        </div>
      ))
    }
    return (
      <div className="home-container">
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
