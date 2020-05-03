import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './home/Home';
// import ChatStart from './chat/ChatStart';
// import Color from './color/Color';
// import BBall from './basketball/BBall';
import ComingSoon from './soon/comingSoon';
import Scattergories from './scattergories/Scattergories';
import TopLevel from './toplevel/TopLevel';
import Layout from './layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faComment, faPalette, faHome, faBrain, faRandom, faBasketballBall
} from '@fortawesome/free-solid-svg-icons';

library.add(faComment, faPalette, faHome, faBrain, faRandom, faBasketballBall);

class App extends React.Component {
  componentWillMount() {
    document.body.style.margin = "0px";
  }

  render () {
    return (
      <Layout>
        <Router>
          <Switch>
          <Route
              path="/basketball"
              render={(props) => (
                <TopLevel {...props}>
                  {<ComingSoon {...props}/>}
                </TopLevel>
              )}
            />
            <Route
              path="/chat"
              render={(props) => (
                <TopLevel {...props}>
                  {<ComingSoon {...props}/>}
                </TopLevel>
              )}
            />
            <Route
              path="/color"
              render={(props) => (
                <TopLevel {...props}>
                  {<ComingSoon {...props}/>}
                </TopLevel>
              )}
            />
            <Route
              path="/scattergories"
              render={(props) => (
                <TopLevel {...props}>
                  {<Scattergories {...props}/>}
                </TopLevel>
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <TopLevel {...props}>
                  {<Home {...props}/>}
                </TopLevel>
              )}
            />
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default App;
