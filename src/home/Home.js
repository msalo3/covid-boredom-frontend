import React from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../common/Card"
import HomeFooter from "./HomeFooter"
import BBall from "../basketball/BBall"
// import Line from "./Line"

import "./home.css"
import { HOME_TEXT } from "./copy"

const Home = () => {
  return (
    <div className="home-container">
      <BBall />
      <div className="home-content">
        <div className="card-middle">
          <Card>
            <div className="inner-card">
              <div className="home-card-text">
                {HOME_TEXT}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <HomeFooter>
        {/* <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
        <FontAwesomeIcon icon="envelope" />
        <FontAwesomeIcon icon="laptop" /> */}
      </HomeFooter>
    </div>
  )
}

export default Home
