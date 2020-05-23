import React from "react"
class Setup extends React.Component {
  state = { name: "" }

  render() {
    const { name } = this.state
    return (
      <form onSubmit={() => this.state.name !== "" && this.props.onClick(name)}>
        <h3>Your Name</h3>
        <input
          name="Name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <button>Start a chat</button>
      </form>
    )
  }
}

export default Setup
