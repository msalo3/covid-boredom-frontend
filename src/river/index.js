import React from "react"

import './River.css'

const River = () => {
  return (
    <div className="river">
      <h2>Up The River, Down the River</h2>
      <p>It's important to know that this game does not save your information.</p>
      <p>If you close the window or reload the window, you'll need to start the game at the beginning!</p>
      <br />
      <p>Credit for styling of the cards for this game goes Anika Henke. Code Repository&nbsp;
        <span>
          <a href="https://github.com/selfthinker/CSS-Playing-Cards" target="_blank" rel="noopener noreferrer">
            here
          </a>
        </span>
      </p>
      <br />
      <a id="river-link" href="http://www.marcsalo.com/upTheRiver.html" target="_blank" rel="noopener noreferrer">
        Open Game In New Page
      </a>
    </div>
  )
}

export default River
