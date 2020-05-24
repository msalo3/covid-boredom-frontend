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
    let players = await apiClient.getNbaPlayersByLetter(name)
    if (players === undefined) players = []
    this.setState({ autocompleteOptions: players, loading: false })
  }

  renderAutoComplete = () => {
    const { autocompleteOptions, playerName, loading } = this.state
    if (loading) return <Loader />
    if (autocompleteOptions.length === 0) return null
    const options = filterOptions(autocompleteOptions, playerName)
    return options.slice(0, 10).map((item, i) => (
      <button key={item} onClick={() => this.props.playerClicked(item)}>
        {item.name}
      </button>
    ))
  }

  render() {
    return (
      <div className="nba-api-container">
        <form>
          <div>
            <label>Search by Last Name</label>
          </div>
          <input
            name="NBA Player"
            value={this.state.playerName}
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </form>
        {this.renderAutoComplete()}
      </div>
    )
  }
}

export default NbaSearch
