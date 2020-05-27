import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./home/Home"
// import ChatStart from "./chat/ChatStart"
// import Color from './color/Color';
import Nba from "./basketball/Nba"
import Quiz from "./quiz"
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
  faIdBadge,
  faChevronLeft,
  faQuestionCircle,
  faStrikethrough,
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
  faLaptop,
  faIdBadge,
  faChevronLeft,
  faQuestionCircle,
  faStrikethrough
)

class App extends React.Component {
  componentDidMount() {
    document.body.style.margin = "0px"
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/basketball"
            render={(props) => <Layout {...props}>{<Nba {...props} />}</Layout>}
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
            path="/quiz"
            render={(props) => (
              <Layout {...props}>{<Quiz {...props} />}</Layout>
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
              <Layout {...props}>{<Home {...props} />}</Layout>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
