import React from "react"
import Bear404 from "./404bear.png"
import "./soon.css"

class ComingSoon extends React.Component {
  render() {
    return (
      <div>
        <div className="soon-container">
          <div className="move-me move-me-3">
            <div>Coming</div>
            <div style={{ textAlign: "center" }}>Soon</div>
          </div>
          <img
            src={Bear404}
            alt="Coming Soon Bear"
            className="soon-inner-text"
          />
        </div>
      </div>
    )
  }
}

export default ComingSoon
