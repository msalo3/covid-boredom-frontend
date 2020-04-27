import React from "react"
import { Button, Form } from 'semantic-ui-react'
import apiClient from '../api/api-client';
import WindowForText from './WindowForText';

class Chat extends React.Component {
  state = {
    chatId: this.props.chatId,
    msg: "",
    fullChat: []
  };

  sendMessage = async () => {
    const { msg, chatId } = this.state;
    const chatBotResponse = await apiClient.postMessage({chatId, msg});
    const newFullChat = [
      ...this.state.fullChat,
      {msg, isFromUser: true},
      chatBotResponse
    ];
    this.setState({ msg: "", fullChat: newFullChat });
  }

  render() {
    return (
      <div>
        <WindowForText />
        <Form onSubmit={this.state.msg !== "" && this.sendMessage}>
          <Form.Field required>
          <input
              name="message"
              value={this.state.msg}
              onChange={(e) => this.setState({ msg: e.target.value })}
            />
          </Form.Field>
          <Button basic color='green' type="submit">
            Send
          </Button>
        </Form>
      </div>
    );
  }
}

export default Chat;