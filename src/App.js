import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./home/Home"
import ChatStart from "./chat/ChatStart"
// import Color from './color/Color';
import BBall from "./basketball/BBall"
import Marc from "./home/Marc"
import ComingSoon from "./soon/comingSoon"
import Scattergories from "./scattergories/Scattergories"
import Layout from "./layout"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faComment,
  faPalette,
  faHome,
  faBrain,
  faRandom,
  faBasketballBall,
  faEnvelope,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(
  faComment,
  faPalette,
  faHome,
  faBrain,
  faRandom,
  faBasketballBall,
  fab,
  faEnvelope,
  faLaptop
)

class App extends React.Component {
  componentWillMount() {
    document.body.style.margin = "0px"
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/basketball"
            render={(props) => (
              <Layout {...props}>{<ComingSoon {...props} />}</Layout>
            )}
          />
          <Route
            path="/chat"
            render={(props) => (
              <Layout {...props}>{<ComingSoon {...props} />}</Layout>
            )}
          />
          <Route
            path="/color"
            render={(props) => (
              <Layout {...props}>{<ComingSoon {...props} />}</Layout>
            )}
          />
          <Route
            path="/scattergories"
            render={(props) => (
              <Layout {...props}>{<Scattergories {...props} />}</Layout>
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <Layout {...props}>{<ComingSoon {...props} />}</Layout>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
