import React from "react"
import { Header, Divider } from 'semantic-ui-react'
import List from './List';
import Timer from './timer/Timer';
import TimerInput from './timer/TimerInput';
import LetterDie from './letter-die/LetterDie'
import Instructions from './Instructions';
import styles from './scattergories_styles';

const { 
  configStyle,
  configMobileStyle,
  headingStyle,
  infoIconStyle,
  gridStyle,
  gridMobileStyle
} = styles;


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
    const {mobile } = this.props;
    return (
      <div style={{ marginTop: '10px' }}>
        <Header style={{headingStyle}}>
          Scattergories
          <sup style={{infoIconStyle}}>
            <Instructions />
          </sup>
        </Header>
        <div style={mobile ? gridMobileStyle : gridStyle}>
          <div>
            <List timerIsCounting={timerIsCounting} mobile={mobile}/>
          </div>
          <div style={mobile ? configMobileStyle : configStyle}>
            <div>
              {this.timerOrInput()}
            </div>
            <Divider />
            <div>
              <LetterDie />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scattergories
