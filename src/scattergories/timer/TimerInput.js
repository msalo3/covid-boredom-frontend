import React from 'react';
import { Button } from 'semantic-ui-react'

import './timerinput.css';

const NUMS1 = [
  {id: 1, number: 1},
  {id: 2, number: 2},
  {id: 3, number: 3}
];

const NUMS2 = [
  {id: 4, number: 4},
  {id: 5, number: 5},
  {id: 6, number: 6}
];

const buttonSelected = {
  backgroundColor: '#0BD952',
  border: '1px solid #152684',
  color: 'black'
};

const normalButton = {
  backgroundColor: '#3151ff',
  border: '1px solid #152684',
  color: 'black'
}

class TimerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 3
    }
  }
  render() {
    const { minutes } = this.state;
    return (
      <div className="app">
        <div className="button-row">
          <div className="row">
            {NUMS1.map((item, i) => (
              <Button
                key={item.id}
                onClick={() => this.setState({ minutes: item.number })}
                style={item.number === minutes ? buttonSelected : normalButton}
              >
                {item.number}
              </Button>
            ))}
          </div>
          <div className="row">
            {NUMS2.map((item, i) => (
              <Button
                key={item.id}
                onClick={() => this.setState({ minutes: item.number })}
                style={item.number === minutes ? buttonSelected : normalButton}
              >
                {item.number}
              </Button>
            ))}
          </div>
        </div>
        <div className="row">
          <Button
            onClick={() => this.props.setMinutes(minutes)}
          >
            Back to Timer
          </Button>
        </div>
      </div>
    );
  }
}

export default TimerInput
