import React from "react"

import "./sliderstyle.css"

const Toggle = ({ toggleTheme, isChecked }) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={toggleTheme} value={isChecked} />
      <span className="slider round"></span>
    </label>
  )
}

export default Toggle
