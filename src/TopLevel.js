import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import {
  contentMobile,
  contentDesktop,
  menuMobile,
  menuDesktop,
  menuContainerMobile,
  menuContainerDesktop,
  menuItemMobile,
  menuItemDesktop,
  AppMobile,
  AppDesktop
} from './toplevel_styles';

import './App.css';

class TopLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.location.pathname
    }
  }

  render () {
    const { activeItem } = this.state;
    const { mobile } = this.props;
    return (
      <div style={mobile ? AppMobile : AppDesktop}>
        <div style={mobile ? menuContainerMobile : menuContainerDesktop}>
          <Menu
            compact={mobile}
            size={mobile ? 'tiny' : 'large'}
            tabular={mobile}
            secondary={!mobile}
            style={mobile ? menuMobile : menuDesktop}
          >
            <Menu.Item
              active={activeItem === '/home'}
              onClick={() => this.setState({ activeItem: '/home' })}
              style={mobile ? menuItemMobile : menuItemDesktop}
            >
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              active={activeItem === '/chat'}
              onClick={() => this.setState({ activeItem: '/chat' })}
              style={mobile ? menuItemMobile : menuItemDesktop}
            >
              <Link to="/chat">Chat</Link>
            </Menu.Item>
            <Menu.Item
              active={activeItem === '/color'}
              onClick={() => this.setState({ activeItem: '/color' })}
              style={mobile ? menuItemMobile : menuItemDesktop}
            >
              <Link to="/color">Color</Link>
            </Menu.Item>
            <Menu.Item
              active={activeItem === '/scattergories'}
              onClick={() => this.setState({ activeItem: '/scattergories' })}
              style={mobile ? menuItemMobile : menuItemDesktop}
            >
              <Link to="/scattergories">Scattergories</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div style={mobile ? contentMobile : contentDesktop}>
          {this.props.children}
        </div>
      </div>            
    );
  }
}

export default TopLevel;