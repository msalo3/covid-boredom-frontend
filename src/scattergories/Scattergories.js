import React from "react"
import { Grid, Divider } from 'semantic-ui-react'
import List from './List';
import Timer from './timer/Timer';
import TimerInput from './timer/TimerInput';
import LetterDie from './letter-die/LetterDie'
import Instructions from './Instructions';

import './scattergories.css';

const style = {
  timerStyle: {
    minHeight: '200px'
  }
}

class Scattergories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 3,
      timeIsSet: false,
      timerIsCounting: false
    };
  }

  timerOrInput = () => {
    const { timeIsSet, minutes, timerIsCounting } = this.state;
    if (timeIsSet) {
      return (
        <Timer
          seconds={minutes * 60}
          onClick={() => this.setState({ timeIsSet: false })}
          timerToggled={() => this.setState({ timerIsCounting: !timerIsCounting })}
        />
      );
    }
    return (
      <TimerInput
        setMinutes={(value) => this.setState({ minutes: value, timeIsSet: true })}
        timeIsSet={timeIsSet}
      />
    );
  }

  render() {
    const {timerIsCounting } = this.state;
    return (
      <div>
        <p className='heading'>
          Scattergories<sup className="info-icon"><Instructions /></sup>
        </p>
        <Grid style={{marginTop: '20px'}}>
          <Grid.Column width={6} style={{marginLeft: '200px'}}>
            <List timerIsCounting={timerIsCounting}/>
          </Grid.Column>
          <Grid.Column width={6} className='config'>
            <Grid.Row style={style.timerStyle}>
              {this.timerOrInput()}
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <LetterDie />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Scattergories
