import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';

import MenuView from '../menu/Index';
import NavigatorView from './Navigation';

export default class ViewScenes extends Component {
  state = {
    isOpen: false,
    selectedItem: {id: 1, name: 'HOME'},
  };
  toogle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }
  onCategoryItemSelected = (item) => {
    this.setState({
       isOpen: false,
       selectedItem: item,
     });
   }

  render() {
    const menu = <MenuView onItemSelected={this.onMenuItemSelected} onMenuToogle={this.toogle} />;
    return (
      <SideMenu
        menu = {menu}
        isOpen = {this.state.isOpen}
        onChange = {(isOpen) => this.updateMenuState(isOpen)}
        openMenuOffset = {Dimensions.get('window').width * 0.6}
      >
        <NavigatorView onMenuToogle={() => this.toogle()} selectedItem = { this.state.selectedItem } onCategoryItemSelected = { this.onCategoryItemSelected } />
      </SideMenu>
    );
  }
}
