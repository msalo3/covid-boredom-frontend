import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import QuizInstance from "./QuizInstance"
import { TeamNameQuiz } from "./quizzes"

import "./quiz.css"

const Quiz = () => {
  const [screen, setScreen] = useState("quiz-home")

  if (screen === "team-names") {
    return (
      <QuizInstance
        backClicked={() => setScreen("quiz-home")}
        data={TeamNameQuiz.data}
        copy1={TeamNameQuiz.copy1}
        copy2={TeamNameQuiz.copy2}
      />
    )
  }

  return (
    <div className="quiz-index-container">
      <div className="quiz-home-container">
        <div className="quiz-heading">
          <div>Quiz Games</div>
        </div>
        <div className="quiz-icons">
          <div className="quiz-icon-container">
            <FontAwesomeIcon
              icon="strikethrough"
              size="2x"
              onClick={() => setScreen("team-names")}
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
    </div>
  )
}

export default Quiz
