'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';
import AppView from '../general/App';

export default class MenuButton extends Component {
  render() {

    return(
      <View style={styles.iconSearch}>
        <Icon
          name='search'
          type='font-awesome'
          color='#fff'
          size={15}
          onPress={() => this.bindOnPress()} />
      </View>
    )
  }

  bindOnPress() {
    this.props.navigator.push(AppView.search())
  }
}
