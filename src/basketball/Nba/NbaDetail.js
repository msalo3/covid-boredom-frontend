import React from "react"
import apiClient from "../../api/api-client"
import Loader from "../../common/Loader"
import NbaCard from "./NbaCard"

import "./nbaDetail.css"

const filterOptions = (arr, item) => {
  return arr.filter((obj) => {
    if (item.length > obj.name.length) return false
    return obj.name.toLowerCase().includes(item.toLowerCase())
  })
}

class NbaDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      details: [],
      images: [],
      loading: true,
    }
  }

  componentDidMount() {
    console.log(this.state, this.props)
    this.getDetails(this.state.player)
  }

  getDetails = async ({ name, link }) => {
    let [details, images] = await Promise.all([
      apiClient.getNbaPlayerByLink(link),
      apiClient.getNbaImage(name),
    ])
    if (details === undefined) details = []
    if (images === undefined) images = []
    this.setState({ details, images, loading: false })
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

  renderImages = () => {
    const { images } = this.state
    if (images.length === 0) return null
    return images.map((item, i) => <img src={item} alt={`player-img-${i}`} />)
  }

  renderDetailsOrLoader = () => {
    const { player, loading } = this.state
    if (loading) return <Loader />

    return (
      <div>
        <button onClick={() => this.props.backClicked()}>Go Back</button>
        <div>{player.name}</div>
        {this.renderImages()}
        {this.renderDetails()}
      </div>
    )
  }

  renderDetails = () => {
    const { details } = this.state
    return details.perGame.map((stats) => <NbaCard stats={stats} />)
  }

  render() {
    return (
      <div className="nba-details-container">
        {this.renderDetailsOrLoader()}
      </div>
    )
  }
}

export default NbaDetail
