'use strict';
import React, {Component} from 'react';

import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';

export default class BackButton extends Component {
  render() {

    return (
      <View style={styles.iconBack}>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.props.navigator.popToTop()} />
      </View>
    );
  }
}
