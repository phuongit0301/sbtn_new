import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import styles from '../../styles/Style';
import FBSDK from 'react-native-fbsdk';
const {
  LoginManager,
} = FBSDK;

export default class LoginFB extends Component {
  render() {
    return (
      LoginManager.logInWithReadPermissions(['public_profile']).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            alert('Login success with permissions: '
              +result.grantedPermissions.toString());
          }
        },
        function(error) {
          alert('Login fail with error: ' + error);
        }
      )
    );
  }
}
