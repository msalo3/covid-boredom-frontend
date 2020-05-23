import React from "react"
import apiClient from "../api/api-client"
import WindowForText from "./WindowForText"

class Chat extends React.Component {
  state = {
    chatId: this.props.chatId,
    msg: "",
    fullChat: [],
  }

  sendMessage = async () => {
    const { msg, chatId } = this.state
    const chatBotResponse = await apiClient.postMessage({ chatId, msg })
    const newFullChat = [
      ...this.state.fullChat,
      { msg, isFromUser: true },
      chatBotResponse,
    ]
    this.setState({ msg: "", fullChat: newFullChat })
  }

  render() {
    return (
      <div>
        <WindowForText />
        <form onSubmit={this.state.msg !== "" && this.sendMessage}>
          <input
            name="message"
            value={this.state.msg}
            onChange={(e) => this.setState({ msg: e.target.value })}
          />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default Chat
