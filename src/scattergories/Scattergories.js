import React from "react"
import List from "./List"
import Timer from "./timer/Timer"
import TimerInput from "./timer/TimerInput"
import LetterDie from "./letter-die/LetterDie"
import Instructions from "./Instructions"

import "./scattergories.css"

const ScatHead = ({cb}) => (
  <h2 className="header">
    Scattergorie
    <span onClick={cb}>
      s
    </span>
    <sup className="icon">
      <Instructions />
    </sup>
  </h2>
)

class Scattergories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: 3,
      timeIsSet: false,
      timerIsCounting: false,
      showListSelect: false
    }
  }

  timerOrInput = () => {
    const { timeIsSet, minutes, timerIsCounting } = this.state
    if (timeIsSet) {
      return (
        <Timer
          seconds={minutes * 60}
          onClick={() => this.setState({ timeIsSet: false })}
          timerToggled={() =>
            this.setState({ timerIsCounting: !timerIsCounting })
          }
        />
      )
    }
    return (
      <TimerInput
        setMinutes={(value) =>
          this.setState({ minutes: value, timeIsSet: true })
        }
        timeIsSet={timeIsSet}
        minutes={minutes}
      />
    )
  }

  render() {
    const { timerIsCounting, showListSelect } = this.state
    return (
      <div>
        <ScatHead cb={() => this.setState((prevState) => ({ showListSelect: !prevState.showListSelect }))}/>
        <div className="scat-content">
          <List timerIsCounting={timerIsCounting} showListSelect={showListSelect} />
          <div className="config-content">
            {this.timerOrInput()}
            <LetterDie timerIsCounting={timerIsCounting} s />
          </div>
        </div>
      </div>
    )
  }
}

export default Scattergories
