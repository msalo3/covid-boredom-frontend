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
          <div>
            <div>{key}</div>
            <div>{value}</div>
          </div>
        )
      }
    }
    return values
  }

  render() {
    const { stats } = this.props
    const { expanded } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ expanded: !expanded })}>
          Season: {stats.season}
        </button>
        {expanded && this.renderSections()}
      </div>
    )
  }
}

export default NbaCard
