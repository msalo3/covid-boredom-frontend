import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuButton from './MenuButton';

import './toplevel.css';

const items = [
  {id: 1, name: '/home', link: '/', icon: 'home', text: 'Home'},
  {id: 2, name: '/basketball', link: '/basketball', icon: 'basketball-ball', text: 'Hoops API'},
  {id: 2, name: '/chat', link: '/chat', icon: 'comment', text: 'Chat'},
  {id: 3, name: '/color', link: '/color', icon: 'palette', text: 'Color'},
  {id: 4, name: '/scattergories', link: '/scattergories', icon: 'brain', text: 'Scattergories'}
];

class TopLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.location.pathname
    }
  }

  mapMenuItems(activeItem) {

    return items.map((item) => (
      <Link to={item.link}>
        <MenuButton text={item.text}>
          <FontAwesomeIcon icon={item.icon} size="2x" />
        </MenuButton>
      </Link>
    ))
  };

  render () {
    const { activeItem } = this.state;
    return (
      <div className="app">
        <div className="menu">
          {this.mapMenuItems(activeItem)}
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>            
    );
  }
}

export default TopLevel;