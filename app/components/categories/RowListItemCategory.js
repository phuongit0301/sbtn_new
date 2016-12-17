import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../../styles/Style';
import DetailsCategory from './DetailsCategory';
import NavigationBar from 'react-native-navbar';

import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class RowListItemCategory extends Component {

  constructor(props) {
    super(props);
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
      <View style={[styles.column, styles.container]}>
          <View style={[styles.sectionHeader, styles.row]}>
              <Text style={styles.sectionText}>{this.props.name}</Text>
          </View>

          <View style={[styles.row, styles.blocks]}>
            {
              this.props.items.map((data, index) => {
                return(
                  <View key={index} style={{width: width/2, height: ((width/2)/16*9) + 20}}>
                    <TouchableHighlight onPress = { () => this.props.navigator.push({
                                                                                    id: data.id,
                                                                                    component: DetailsCategory,
                                                                                    navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                                                                      statusBar = {{ hidden: true }}
                                                                                                      leftButton = { this.renderBackButton() }
                                                                                                      style={styles.navigationBar}
                                                                                                      rightButton = { this.renderNavIconSearch() } />
                                                                                  })}>
                      <View style={[styles.thumbnailContainer, styles.column]}>
                        <Image source={{uri: data.image}} style={{width: width/2, height: ((width/2)/16*9)}} />
                        <View style={styles.titleContainer}>
                          <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{data.name}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                )
              })
            }
          </View>
      </View>
    );
  }
}
