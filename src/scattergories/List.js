import React from "react"
import { Header, Dropdown, Grid, Button } from 'semantic-ui-react'
import data from './JsonData/scattergories_lists.json';

import './list.css'

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: 1
    }
  }
  renderListItems = (list, timerIsCounting) => (
    list.list_items.map((item, i) => {
      if (timerIsCounting) {
        return <Header as='h3' key={item.id}>{`${item.id}. ${item.title}`}</Header>;
      }
      return(
        <Header as='h3' key={item.id} className="redacted">
          {item.id}. <span>{item.title}</span>
        </Header>
      );
    })
  );
  randomizeListId = () => {
    const randomId = Math.floor(Math.random() * (data.length - 1));
    this.setState({ listId: randomId });
  }

  render () {
    const { timerIsCounting } = this.props;
    const { listId } = this.state;
    const list = data[listId - 1];
    return (
      <div>
        <Grid as="h2">
        <Grid.Column width={3} />
          <Grid.Column width={6}>
            <span>
              List Number{' '}
              <Dropdown
                inline
                scrolling
                disabled={timerIsCounting}
                options={data}
                value={listId}
                onChange={(e, { value }) => this.setState({ listId: value })}
              />
            </span>
          </Grid.Column>
          <Grid.Column width={2}>
            <Button style={{ justifySelf: 'right'}} onClick={() => this.randomizeListId()}>
              Randomize
            </Button>
          </Grid.Column>
        </Grid>
        <div style={{textAlign: 'left'}}>
          {this.renderListItems(list, timerIsCounting)}
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  timerIsCounting: false
};

export default List

