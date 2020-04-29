import React from "react"
import { Header, Dropdown, Grid, Button } from 'semantic-ui-react'
import data from './JsonData/scattergories_lists.json';

import './list.css'

const listContainerStyle = {textAlign: 'left', margin: '10px'};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: 1
    }
  }
  renderListItems = (list, timerIsCounting, mobile) => (
    list.list_items.map((item, i) => {
      if (timerIsCounting) {
        return <Header as={mobile ? 'h4' : 'h3'} key={item.id}>{`${item.id}. ${item.title}`}</Header>;
      }
      return(
        <Header as={mobile ? 'h4' : 'h3'} key={item.id} className="redacted">
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
    const { timerIsCounting, mobile } = this.props;
    const { listId } = this.state;
    const list = data[listId - 1];
    return (
      <div>
        <Grid as={mobile ? "h3" : "h2"}>
          <Grid.Column width={mobile ? 3 : 1} />
          <Grid.Column width={mobile ? 6 : 10}>
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
          <Grid.Column width={4}>
            <Button
              style={{ justifySelf: 'right'}}
              onClick={() => this.randomizeListId()}
              size={mobile ? "tiny" : "medium"}
            >
              Randomize
            </Button>
          </Grid.Column>
        </Grid>
        <div style={listContainerStyle}>
          {this.renderListItems(list, timerIsCounting, mobile)}
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  timerIsCounting: false
};

export default List

