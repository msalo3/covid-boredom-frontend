import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./quizInstance.css"

const QuizInstance = ({ data, cardStyle, backClicked, copy1, copy2 }) => {
  const [teams, setTeams] = useState(data)
  const [inputValue, setInputValue] = useState("")
  const [incorrect, setIncorrect] = useState(false)
  const [reguessedIndex, setReguessedIndex] = useState(null)
  const [isWon, setIsWon] = useState(false)

  const renderGameOrWin = () => {
    if (isWon) {
      return <div className="q-teams-wontext">Congrats! You Won!</div>
    }
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            name=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="q-teams-input"
          />
        </form>
        <div className="q-teams-container">{renderTeams()}</div>
      </>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let needToChangeState = 0
    let totalTeamsGuessed = 0

    let idx = null
    const newTeams = teams.map((team, i) => {
      if (team.guessed) totalTeamsGuessed += 1
      if (team.name.toLowerCase() === inputValue.toLowerCase()) {
        if (team.guessed) {
          needToChangeState = 2
          idx = i
        } else {
          totalTeamsGuessed += 1
          needToChangeState = 1
        }
        return {
          name: team.name,
          league: team.league,
          guessed: true,
        }
      }
      return team
    })

    if (needToChangeState === 0) {
      setIncorrect(true)
    } else {
      setTeams(newTeams)
      setInputValue("")
      setReguessedIndex(idx)
      setIsWon(totalTeamsGuessed === 9)
      
      if (needToChangeState === 2) {
        setTimeout(() => {
          setInputValue("")
          setReguessedIndex(null)
        }, 2000)
      }
    }
    return false
  }

  const renderTeams = () => {
    return teams.map((team, i) => {
      if (team.guessed) {
        let classes = "q-team-card q-card-guessed"
        if (reguessedIndex === i) classes = classes + " q-reguessed"
        return (
          <div key={team.name} className={classes} style={cardStyle}>
            <div className="q-team-text">{team.name}</div>
          </div>
        )
      }
      return (
        <div key={team.name} className="q-team-card" style={cardStyle}>
          <div className="q-team-text">{team.placeholder}</div>
        </div>
      )
    })
  }

  return (
    <div className="q-container">
      <div className="q-top-row">
        <FontAwesomeIcon
          icon="chevron-left"
          size="2x"
          onClick={backClicked}
          className="q-back-btn"
        />
        <div className="q-container">
          <div className="q-heading">{copy1}</div>
          <div className="q-heading">{copy2}</div>
        </div>
      </div>
      {renderGameOrWin()}
    </div>
  )
}

export default QuizInstance
