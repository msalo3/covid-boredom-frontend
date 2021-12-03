import React from "react"

import './snake.css'

const Snake = () => {
  return (
    <div className="river">
      <h2>Classic Snake Game</h2>
      <p>It's important to know that this game does not save your information.</p>
      <p>If you close the window or reload the window, you'll need to start the game at the beginning!</p>
      <br />
      <a id="river-link" href="http://www.marcsalo.com/snakeGame.html" target="_blank" rel="noopener noreferrer">
        Open Game In New Page
      </a>
    </div>
  )
}

export default Snake
