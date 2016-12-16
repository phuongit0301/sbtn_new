import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import MenuUserView from './User.js';
import MenuContentView from './Menu.js';
import styles from '../../styles/Style';

export default class MenuView extends Component {

  render() {
    return(
      <View style = {styles.menuView}>
        <MenuUserView onItemSelected={this.props.onItemSelected} onMenuToogle={this.props.onMenuToogle} />
        <MenuContentView onItemSelected={this.props.onItemSelected} />
      </View>
    );
  }
}
