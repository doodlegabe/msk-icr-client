import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react';

export default class MainNav extends Component {
  static propTypes = {
  };
  state = { activeItem: 'closest' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;

    return (
      <Menu text>
        <Menu.Item header> MSK ICR Prototype Client</Menu.Item>
        <Menu.Item
          name='Documentation'
          active={activeItem === 'closest'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
};