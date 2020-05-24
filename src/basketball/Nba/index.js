import React from "react"
import NbaSearch from "./NbaSearch"
import NbaDetail from "./NbaDetail"

import "./nba.css"

class Nba extends React.Component {
  state = {
    screen: "search",
    player: {},
  }

  searchOrDetail = () => {
    const { screen, player } = this.state
    if (screen === "search") {
      return (
        <NbaSearch
          playerClicked={(item) =>
            this.setState({ screen: "detail", player: item })
          }
        />
      )
    } else {
      return (
        <NbaDetail
          player={player}
          backClicked={() => this.setState({ screen: "search" })}
        />
      )
    }
  }

  render() {
    return <div className="nba-api-container">{this.searchOrDetail()}</div>
  }
}

export default Nba
