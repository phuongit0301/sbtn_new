import React, { Component } from 'react';
import { Text, View, StyleSheet, Navigator, Dimensions, TouchableOpacity, EventBus } from 'react-native';

import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

import AppView from './App';
import HomeView from '../home/Index';
import Search from '../search/Search';
import styles from '../../styles/Style';

let SCREEN_WIDTH = Dimensions.get('window').width;

let BaseConfig = Navigator.SceneConfigs.FloatFromRight;

let CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

let CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});

export default class NavigatorView extends Component {

  static propsType = {
    onMenuToogle: React.PropTypes.func.isRequired,
    selectedItem: React.PropTypes.object.isRequired,
    onCategoryItemSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  }

  renderNavIconMenu() {
    return(
      <View style = { styles.NavIconMenu } >
        <Icon name = 'menu' color = 'white' onPress = { () => this.props.onMenuToogle() } />
      </View>
    )
  }
  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.onCategoryItemSelected({id: 1, name: 'HOME'})}>
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
          onPress={() => this.navigator.jumpBack()} />
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
    this.navigator.push({
                          id: null,
                          title: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} statusBar = {{ hidden: true }} leftButton={this.renderBackButton()}
                          style={styles.navigationBar} />
      })
  }

  renderScene(route, navigator) {
    let Component = route.component;
    
    let navBar = route.navigationBar;
    if (navBar) {
      navBar = React.cloneElement(navBar, {
        navigator: navigator,
        route: route
      });
    }
    return (
      <View style = {styles.navigator}>
        {navBar}
        <Component navigator={navigator} {...route.passProps} route={route} selectedMenuItem = { this.props.selectedItem } onCategoryItemSelected = { this.props.onCategoryItemSelected } onMenuToogle={this.props.onMenuToogle}/>
      </View>
    );
  }

  render() {
    return (
      <Navigator
        initialRoute = {{
          component: AppView,
          navigationBar: <NavigationBar
                style = {styles.navigationBar}
                title = {this.renderLogoNavBar()}
                statusBar = {{ hidden: true }}
                leftButton = { this.renderNavIconMenu() }
                rightButton = { this.renderNavIconSearch() }
              />
        }}
        ref={navigator => this.navigator = navigator}
        renderScene = { (route, navigator) => this.renderScene(route, navigator) }
      />
    );
  }
}
