import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import Home from './home/Home';
import ChatStart from './chat/ChatStart';
import Color from './color/Color';
import Scattergories from './scattergories/Scattergories';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav className="Nav">
          <Grid>
            <Grid.Column>
              <Link to="/">Home</Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/chat">Chat</Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/color">Color</Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/scattergories">Scattergories</Link>
            </Grid.Column>
          </Grid>
        </nav>
        <Switch>
          <Route path="/chat">
            <Home />
            {/* <ChatStart /> */}
          </Route>
          <Route path="/color">
            <Home />
            {/* <Color /> */}
          </Route>
          <Route path="/scattergories">
            <Scattergories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}