'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';

export default class LoginButton extends Component {

  render() {
    return (
      <View style={[styles.loginButton]}>
        <TouchableOpacity onPress={ () => this.props.onItemSelected({name: 'LOGIN'}) }>
          <Text style={[styles.white, styles.textBtnLogin]}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
