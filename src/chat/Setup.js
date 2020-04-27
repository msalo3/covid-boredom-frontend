import React from "react"
import { Header, Button, Form } from 'semantic-ui-react'

class Setup extends React.Component {
  state = {name: ""};

  render() {
    const { name } = this.state;
    return (
      <Form onSubmit={() => this.state.name !== "" && this.props.onClick(name)}>
        <Header as='h3'>Your Name</Header>
        <Form.Field required>
          <input
            name="Name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </Form.Field>
        <Button basic color='green' type="submit">
          Start a chat
        </Button>
      </Form>
    );
  }
}

export default Setup;