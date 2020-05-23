import React, { useState, useEffect } from "react"
import TopLevel from "./toplevel/TopLevel"
import { lightTheme, darkTheme } from "./colorThemes"

import "./layout.css"

export default function Layout(props) {
  const [currentMode, setCurrentMode] = useState("light")
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("mode") === "dark") {
      setCurrentMode("dark")
      setIsChecked(true)
    }
  }, [])

  useEffect(() => {
    const theme = currentMode === "light" ? lightTheme() : darkTheme()
    Object.keys(theme).forEach((key) => {
      const value = theme[key]
      document.documentElement.style.setProperty(key, value)
    })
  }, [currentMode])

  const toggleTheme = () => {
    const newMode = currentMode === "light" ? "dark" : "light"
    setIsChecked(!isChecked)
    setCurrentMode(newMode)
    localStorage.setItem("mode", newMode)
  }

  return (
    <TopLevel {...props} toggleTheme={toggleTheme} isChecked={isChecked}>
      {props.children}
    </TopLevel>
  )
}
