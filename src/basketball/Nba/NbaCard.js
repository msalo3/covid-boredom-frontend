import React from "react"
import "./nbaCard.css"

class NbaCard extends React.Component {
  state = {
    expanded: false,
  }

  renderSections = () => {
    const { stats } = this.props
    const values = []
    for (const [key, value] of Object.entries(stats)) {
      if (key !== "season") {
        values.push(
          <div key={key} className="stats-text-container">
            <div className="stats-text-key">{key}:</div>
            <div className="stats-text-value">
              &nbsp;
              {` ${value}` || " N/A"}
            </div>
          </div>
        )
      }
    }
    const toAdd = values.length % 3
    if (toAdd !== 0) {
      for (let i = 0; i < toAdd; i++) {
        values.push(<div className="stats-text-container" />)
      }
    }
    return values
  }

  render() {
    const { stats } = this.props
    const { expanded } = this.state
    return (
      <div className="nba-card-wrapper">
        <button
          className="nba-card-btn"
          onClick={() => this.setState({ expanded: !expanded })}
        >
          Season: {stats.season}
        </button>
        <div className="nba-expanded-container">
          {expanded && this.renderSections()}
        </div>
      </div>
    )
  }
}

export default NbaCard
