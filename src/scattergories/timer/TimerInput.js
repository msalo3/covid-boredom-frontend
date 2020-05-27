import React from "react"

import "./timerinput.css"

const NUMS1 = [
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
]
const NUMS2 = [
  { id: 4, number: 4 },
  { id: 5, number: 5 },
  { id: 6, number: 6 },
]

class TimerInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: props.minutes,
    }
  }

  renderButtons = (arr, minutes) =>
    arr.map((item) => (
      <button
        key={item.id}
        onClick={() => this.setState({ minutes: item.number })}
        className={`min-btn min-btn-${
          item.number === minutes ? "selected" : ""
        }`}
      >
        {item.number}
      </button>
    ))

  render() {
    const { minutes } = this.state
    return (
      <div className="input-container">
        <div className="button-row">{this.renderButtons(NUMS1, minutes)}</div>
        <div className="button-row">{this.renderButtons(NUMS2, minutes)}</div>
        <button
          className="button btn-time-input"
          onClick={() => this.props.setMinutes(minutes)}
        >
          Back to Timer
        </button>
      </div>
    )
  }
}

export default TimerInput
