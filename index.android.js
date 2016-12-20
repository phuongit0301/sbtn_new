/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import ViewScenes from './app/components/general/ViewScenes';

export default class sbtn_new extends Component {
  render() {
    return (
      <ViewScenes />
    );
  }
}

AppRegistry.registerComponent('sbtn_new', () => sbtn_new);
