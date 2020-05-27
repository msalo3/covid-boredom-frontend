import React from "react"
import apiClient from "../../api/api-client"
import Loader from "../../common/Loader"

import "./nbaSearch.css"

const filterOptions = (arr, item) => {
  return arr.filter((obj) => {
    if (item.length > obj.name.length) return false
    return obj.name.toLowerCase().includes(item.toLowerCase())
  })
}

class NbaSearch extends React.Component {
  state = {
    playerName: "",
    lastLetterRetrieved: "",
    autocompleteOptions: [],
    loading: false,
  }

  handleChange = (val) => {
    const { lastLetterRetrieved } = this.state

    this.setState({ playerName: val })

    if (val === "") return null
    if (val !== lastLetterRetrieved && val.length === 1) {
      this.setState({ loading: true })
      this.getNbaPlayers(val)
    }
  }

  getNbaPlayers = async (name) => {
    let players = await apiClient.getNbaPlayersByLetter(name.toLowerCase())
    if (players === undefined) players = []
    this.setState({
      autocompleteOptions: players,
      loading: false,
      lastLetterRetrieved: name,
    })
  }

  renderAutoComplete = () => {
    const { autocompleteOptions, playerName, loading } = this.state
    if (loading) return <Loader />
    if (autocompleteOptions.length === 0) return null
    const options = filterOptions(autocompleteOptions, playerName)
    return options.slice(0, 10).map((item, i) => (
      <button
        key={item.name}
        onClick={() => this.props.playerClicked(item)}
        className="nba-options-btn"
      >
        {item.name}
      </button>
    ))
  }

  render() {
    return (
      <div className="nba-api-container">
        <form>
          <div>
            <div className="header nba-search-header">Search by Last Name</div>
          </div>
          <input
            className="nba-search-input"
            disabled={this.state.loading}
            name="NBA Player"
            value={this.state.playerName}
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </form>
        {this.renderAutoComplete()}
        <div className="nba-search-instructions">
          The first letter will get all NBA players whose last name begins with
          that letter.
        </div>
        <div className="nba-search-instructions">
          Then you can hone down the list to find the player.
        </div>
      </div>
    )
  }
}

export default NbaSearch
