import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './home/Home';
import ChatStart from './chat/ChatStart';
import Color from './color/Color';
import Scattergories from './scattergories/Scattergories';
import TopLevel from './TopLevel';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: window.innerWidth <= 760
    }
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  
  resize() {
    this.setState({mobile: window.innerWidth <= 760});
  }
  render () {
    const { mobile } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/chat"
            render={(props) => (
              <TopLevel {...props} mobile={mobile}>
                {<Home {...props} mobile={mobile}/>}
              </TopLevel>
            )}
          />
          <Route
            path="/color"
            render={(props) => (
              <TopLevel {...props} mobile={mobile}>
                {<Home {...props} mobile={mobile}/>}
              </TopLevel>
            )}
          />
          <Route
            path="/scattergories"
            render={(props) => (
              <TopLevel {...props} mobile={mobile}>
                {<Scattergories {...props} mobile={mobile}/>}
              </TopLevel>
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <TopLevel {...props} mobile={mobile}>
                {<Home {...props} mobile={mobile}/>}
              </TopLevel>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
