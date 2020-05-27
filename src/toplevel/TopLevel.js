import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MenuButton from "./MenuButton"
import Toggle from "./Toggle"

import "./toplevel.css"

const items = [
  { id: 1, name: "/home", link: "/", icon: "home", text: "Home" },
  {
    id: 2,
    name: "/basketball",
    link: "/basketball",
    icon: "basketball-ball",
    text: "Hoops API",
  },
  { id: 3, name: "/chat", link: "/chat", icon: "comment", text: "Chat" },
  {
    id: 4,
    name: "/quiz",
    link: "/quiz",
    icon: "question-circle",
    text: "Quiz",
  },
  { id: 5, name: "/color", link: "/color", icon: "palette", text: "Color" },
  {
    id: 6,
    name: "/scattergories",
    link: "/scattergories",
    icon: "brain",
    text: "Scattergories",
  },
]

class TopLevel extends React.Component {
  mapMenuItems(activeItem) {
    return items.map((item) => (
      <Link to={item.link} key={item.id}>
        <MenuButton text={item.text} activeItem={activeItem === item.name}>
          <FontAwesomeIcon icon={item.icon} size="2x" />
        </MenuButton>
      </Link>
    ))
  }

  render() {
    const { pathname } = this.props.location
    return (
      <div className="app">
        <div className="menu">
          <div className="menu-top">
            {this.mapMenuItems(pathname)}
            <div className="color-toggle">
              <Toggle
                toggleTheme={this.props.toggleTheme}
                isChecked={this.props.isChecked}
              />
            </div>
          </div>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    )
  }
}

export default TopLevel
