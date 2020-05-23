import React from "react"

import "./sliderstyle.css"

const Toggle = ({ toggleTheme, isChecked }) => {
  return (
    <label class="switch">
      <input type="checkbox" onChange={toggleTheme} value={isChecked} />
      <span class="slider round"></span>
    </label>
  )
}

export default Toggle
