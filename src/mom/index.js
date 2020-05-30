import React from "react"
import MomHome from "./MomHome"
import MomCardScreen from "./MomCardScreen"
import { SCREENS, COPY, PRICING_COPY, HEADER_COPY } from "./momConstants"

import "./mom.css"

class Mom extends React.Component {
  state = {
    currentScreen: "home",
  }

  renderHomeOrScreens = () => {
    const { currentScreen } = this.state
    if (currentScreen === "home") {
      return (
        <MomHome
          onScreenClick={(screen) => this.setState({ currentScreen: screen })}
        />
      )
    }
    console.log(currentScreen, SCREENS)
    const theScreen = SCREENS.filter((item) => item.screen === currentScreen)[0]
    return (
      <MomCardScreen
        screen={theScreen}
        backClicked={() => this.setState({ currentScreen: "home" })}
      />
    )
  }

  render() {
    return (
      <div className="mom-container">
        <div className="header">{HEADER_COPY}</div>
        {this.renderHomeOrScreens()}
      </div>
    )
  }
}

export default Mom

// class emailForm extends React.Component {
//   handleSubmit = (e) => {
//     e.preventDefault()
//     return false
//   }
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             name=""
//             value={this.state.inputValue}
//             onChange={(e) => this.setState({ inputValue: e.target.value })}
//             className="mom-email-input"
//           />
//         </form>
//       </div>
//     )
//   }
// }
