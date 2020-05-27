import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TeamNames from "./TeamNames"

import "./quiz.css"

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: "quiz-home", // quiz-home, team-names
    }
  }

  renderQuizHome = () => {
    return (
      <div className="quiz-home-container">
        <div className="quiz-heading">
          <div>Quiz Games</div>
        </div>
        <div className="quiz-icons">
          <div className="quiz-icon-container">
            <FontAwesomeIcon
              icon="strikethrough"
              size="2x"
              onClick={() => this.setState({ screen: "team-names" })}
              className="quiz-icon"
            />
            <div className="quiz-icon-text">
              Guess the pro sports teams that don't begin with an "S"
            </div>
          </div>
          <div className="quiz-icon-container quiz-heading">
            More Coming Soon
          </div>
        </div>
      </div>
    )
  }

  renderQuizScreens = () => {
    const { screen } = this.state

    switch (screen) {
      case "team-names":
        return (
          <TeamNames
            backClicked={() => this.setState({ screen: "quiz-home" })}
          />
        )
      default:
        return this.renderQuizHome()
    }
  }

  render() {
    return (
      <div className="quiz-index-container">{this.renderQuizScreens()}</div>
    )
  }
}

export default Quiz
