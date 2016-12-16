'use strict';
import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  AsyncStorage,
  View
} from 'react-native';

import styles from '../../styles/Style';

export default class LogoutButton extends Component {

  constructor(props) {
      super(props);
      this.state = {
        loaded: true
      }
  }

  logout(){
    AsyncStorage.removeItem('userData').then(() => {
      this.setState({loaded: false});
      this.props.onItemSelected({name: 'HOME'});
    });
  }

  render() {
    return (
      <View style={styles.containerJustifyCenter}>
        <TouchableOpacity style={styles.loginButton} onPress={() => this.logout()}>
          <Text style={styles.white}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
