import React from "react"
import data from "./JsonData/scattergories_lists.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./list.css"

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listId: 1,
      data: data,
    }
  }
  renderListItems = (list, timerIsCounting) =>
    list.list_items.map((item, i) => {
      if (timerIsCounting) {
        return <h3 key={item.id}>{`${item.id}. ${item.title}`}</h3>
      }
      return (
        <h3 key={item.id} className="redacted">
          {item.id}. <span>{item.title}</span>
        </h3>
      )
    })
  randomizeListId = () => {
    const randomId = Math.floor(Math.random() * (data.length - 2))
    this.setState({ listId: randomId })
  }

  selectList = (timerIsCounting) => (
    <div>
      List Number{" "}
      <select
        id="lists"
        disabled={timerIsCounting}
        onChange={(event) => this.setState({ listId: event.target.value })}
      >
        {data.map((item) => (
          <option value={item.value}>{item.value}</option>
        ))}
      </select>
    </div>
  )

  render() {
    const { timerIsCounting, showListSelect } = this.props
    const { listId, data } = this.state
    const list = data[listId]
    return (
      <div>
        <span
          className={`game-container tooltip ${
            timerIsCounting ? "inactive" : ""
          }`}
        >
          <div>List {listId}</div>
          <span className="tooltiptext">Randomize</span>
          <div className="random">
            <FontAwesomeIcon
              icon="random"
              onClick={() => !timerIsCounting && this.randomizeListId()}
            />
          </div>
        </span>
        <div className="list-container">
          {this.renderListItems(list, timerIsCounting)}
        </div>
        <div>
          {showListSelect && this.selectList(timerIsCounting)}
        </div>
      </div>
    )
  }
}

List.defaultProps = {
  timerIsCounting: false,
}

export default List
