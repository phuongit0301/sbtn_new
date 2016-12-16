import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import DetailsCategory from '../categories/DetailsCategory';
import Search from '../search/Search';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import styles from '../../styles/Style';

export default class RowSearch extends Component {

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
            navigationBar: <NavigationBar title={this.renderLogoNavBar()} statusBar = {{ hidden: true }} leftButton={this.renderBackButton()}
            style={styles.navigationBar} />
      })
  }

  render() {
    return (
      <View key={this.props.id} style={this.props.containerImageSize}>
          <TouchableHighlight onPress = { () => this.props.navigator.push({
                                id: this.props.id,
                                title: this.renderLogoNavBar(),
                                component: DetailsCategory,
                                navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                  statusBar = {{ hidden: true }}
                                                  leftButton = { this.renderBackButton() }
                                                  style={styles.navigationBar}
                                                  rightButton = { this.renderNavIconSearch() } />
                              }) }>
            <View style={[styles.thumbnailContainer]}>
              <Image source={{uri: this.props.image}} style={this.props.imageSize} />
              <View style={styles.titleContainer}>
                <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{this.props.name}</Text>
              </View>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
}
