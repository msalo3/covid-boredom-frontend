import React from "react"

import './bball.css';

class BBall extends React.Component {
  state = {
  };

  getData = async () => {
    // const data = await nbapi.getColors(hexColor);
  }

  buttonOrApiRequest = () => {
    return (
      <button onClick={() => this.getData()}>
        Play the Color Game
      </button>
    );
  }

  render() {
    return (
      <div>
        <h1>NBA</h1>
        {this.buttonOrApiRequest()}
      </div>
    );
  }
}

export default BBall