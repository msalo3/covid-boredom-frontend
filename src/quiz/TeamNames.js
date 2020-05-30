import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./teamNames.css"

const DATA = [
  { name: "Red Sox", league: "MLB", guessed: true, reguessed: false },
  { name: "White Sox", league: "MLB", guessed: true, reguessed: false },
  { name: "Heat", league: "NBA", guessed: false, reguessed: false },
  { name: "Thunder", league: "NBA", guessed: true, reguessed: false },
  { name: "Magic", league: "NBA", guessed: true, reguessed: false },
  { name: "Jazz", league: "NBA", guessed: true, reguessed: false },
  { name: "Avalanche", league: "NHL", guessed: true, reguessed: false },
  { name: "Wild", league: "NHL", guessed: true, reguessed: false },
  { name: "Lightning", league: "NHL", guessed: true, reguessed: false },
]

const COPY1 =
  'In the NFL, NBA, MLB, and NHL there are a total of 9 teams whose names do not end in an "S"'
const COPY2 = "Can you guess them all??"

class TeamNames extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: DATA,
      inputValue: "",
      incorrect: false,
      reguessedIndex: null,
      isWon: false,
    }
  }

  renderGameOrWin = () => {
    if (this.state.isWon) {
      return <div className="q-teams-wontext">Congrats! You Won!</div>
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            name=""
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            className="q-teams-input"
          />
        </form>
        <div className="q-teams-container">{this.renderTeams()}</div>
      </>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { teams, inputValue } = this.state
    let needToChangeState = 0
    let totalTeamsGuessed = 0

    let reguessedIndex = null
    const newTeams = teams.map((team, i) => {
      if (team.guessed) totalTeamsGuessed += 1
      if (team.name.toLowerCase() === inputValue.toLowerCase()) {
        if (team.guessed) {
          needToChangeState = 2
          reguessedIndex = i
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
      this.setState({ incorrect: true })
    } else {
      this.setState({
        teams: newTeams,
        inputValue: "",
        reguessedIndex,
        isWon: totalTeamsGuessed === 9,
      })
      if (needToChangeState === 2) {
        setTimeout(
          () => this.setState({ inputValue: "", reguessedIndex: null }),
          2000
        )
      }
    }
    return false
  }

  renderTeams = () => {
    const { teams, reguessedIndex } = this.state
    return teams.map((team, i) => {
      if (team.guessed) {
        let classes = "q-team-card q-card-guessed"
        if (reguessedIndex === i) classes = classes + " q-reguessed"
        return (
          <div key={team.name} className={classes}>
            <div className="q-team-text">{team.name}</div>
          </div>
        )
      }
      return (
        <div key={team.name} className="q-team-card">
          <div className="q-team-text">{team.league}</div>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="q-container">
        <div className="q-top-row">
          <FontAwesomeIcon
            icon="chevron-left"
            size="2x"
            onClick={() => this.props.backClicked()}
            className="q-back-btn"
          />
          <div className="q-copy-container">
            <div className="q-heading">{COPY1}</div>
            <div className="q-heading">{COPY2}</div>
          </div>
        </div>
        {this.renderGameOrWin()}
      </div>
    )
  }
}

export default TeamNames
