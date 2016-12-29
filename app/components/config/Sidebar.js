import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ListView, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import DetailsCategory from '../categories/DetailsCategory';
import Search from '../search/Search';
import styles from '../../styles/Style';

import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

const { width, height } = Dimensions.get('window');

const BLOCK_MARGIN = 5;

export default class ListItem {

  renderNavIconMenu() {
    return(
      <View style = { styles.NavIconMenu } >
        <Icon name = 'menu' color = 'white' onPress = { () => this.props.onMenuToogle() } />
      </View>
    )
  }
  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
          <Text style={styles.logo}>SBTN</Text>
      </TouchableOpacity>
    )
  }
  renderBackButton() {
    return(
      <View style={styles.iconBack}>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.props.navigator.jumpBack()} />
      </View>
    )
  }
  renderNavIconSearch() {
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
    this.props.navigator.push({
                          id: null,
                          title: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderBackButton()}
                                                        statusBar = {{ hidden: true }} style={styles.navigationBar} />
      })
  }
}
