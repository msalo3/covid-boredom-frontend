import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import QuizInstance from "./QuizInstance"
import { TeamNameQuiz } from "./quizzes"

import "./quiz.css"

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screen: "quiz-home", // quiz-home, team-names, pokemon
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
            <FontAwesomeIcon
              icon="dot-circle"
              size="2x"
              onClick={() => this.setState({ screen: "pokemon" })}
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
          <QuizInstance
            backClicked={() => this.setState({ screen: "quiz-home" })}
            data={TeamNameQuiz.data}
            copy1={TeamNameQuiz.copy1}
            copy2={TeamNameQuiz.copy2}
          />
        )
      case "pokemon":
        return (
          <QuizInstance
            backClicked={() => this.setState({ screen: "quiz-home" })}
            data={TeamNameQuiz.data}
            copy1={TeamNameQuiz.copy1}
            copy2={TeamNameQuiz.copy2}
            cardStyle={{ width: "10%" }}
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
