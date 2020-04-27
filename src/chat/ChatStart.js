import React from "react"
import { Header } from 'semantic-ui-react'
import apiClient from '../api/api-client';
import Chat from './Chat';
import Setup from './Setup';

class ChatStart extends React.Component {
  state = {
    chatStarted: false,
    chatId: true
  };

  startNewChat = async (name) => {
    const chatId = apiClient.createNewChat(name);
    this.setState({ chatStarted: true, chatId });
  }

  buttonOrChat = () => {
    const { chatStarted, chatId } = this.state;
    if (chatStarted) {
      return <Chat chatId={chatId}/>;
    }
    return (
      <Setup onClick={(name) => this.startNewChat(name)} />
    );
  }

  render() {
    return (
      <div>
        <Header as='h1'>Chat Bot</Header>
        {this.buttonOrChat()}
      </div>
    );
  }
}

export default ChatStart
