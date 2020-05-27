import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
    this.getDetails(this.state.player)
  }

  getDetails = async ({ name, link }) => {
    let [details, images] = await Promise.all([
      apiClient.getNbaPlayerByLink(link),
      apiClient.getNbaImage(name),
    ])
    if (details === undefined) {
      details = []
    } else {
      details = details.perGame.map((item, i) => {
        item.id = i
        return item
      })
    }

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
    return images.map((item, i) => (
      <div key={item} className="nba-img-holder">
        <img src={item} alt={`player-img-${i}`} className="nba-img" />
      </div>
    ))
  }

  renderDetailsOrLoader = () => {
    const { loading } = this.state
    if (loading)
      return (
        <div className="nba-detail-loader-container">
          <Loader />
        </div>
      )

    return (
      <div className="nba-info-container">
        <div className="nba-img-container">{this.renderImages()}</div>
        <div className="nba-card-container">{this.renderDetails()}</div>
      </div>
    )
  }

  renderDetails = () => {
    const { details } = this.state
    return details.map((stats) => <NbaCard key={stats.id} stats={stats} />)
  }

  render() {
    const { player } = this.state
    return (
      <div className="nba-details-container">
        <div className="nba-top-row">
          <FontAwesomeIcon
            icon="chevron-left"
            size="2x"
            onClick={() => this.props.backClicked()}
            className="nba-back-btn"
          />
          <div className="header nba-name">{player.name}</div>
          <div />
        </div>
        {this.renderDetailsOrLoader()}
      </div>
    )
  }
}

export default NbaDetail
