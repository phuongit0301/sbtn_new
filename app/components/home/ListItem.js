import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ListView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, InteractionManager} from 'react-native';
import DetailsCategory from '../categories/DetailsCategory';
import Search from '../search/Search';
import styles from '../../styles/Style';

import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';

const { width, height } = Dimensions.get('window');

const BLOCK_MARGIN = 5;
const _oldProgress = 0;
const imageDevice = width+'x'+height;

export default class ListItem extends Component {
  static propsType = {
    onCategoryItemSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);
      this.state = ({
        dataList: null,
        width: 0,
        imageLoading: true,
        loading: true
      });

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
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderBackButton()}
                                                        statusBar = {{ hidden: true }} style={styles.navigationBar} />
      })
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dataList: this.props.dataList,
        loading: !this.state.loading
      })
    });
  }

  renderSectionHeader(key) {
    return (
      <View style={styles.sectionHeader}>
       <Text style={styles.sectionText}>{key}</Text>
      </View>
    )
  }

  renderData(dataList) {
    return (
      Object.keys(dataList).map((key) => {
        return (
          <View key={key}>
              { dataList[key].length > 0 ? this.renderSectionHeader(key) : null }
              { dataList[key].length > 0 ? this.renderDataContent(dataList, key) : null }
          </View>
          )
      })
    );
  }

  renderDataContent(dataList, key) {
    let len = dataList[key] ? dataList[key].length : height;
    return (
          <View style={styles.scrollArea}>
             <LazyloadScrollView
                contentContainerStyle={[styles.content, {width: ((len*3/7) * (width - 5)) }]}
                style={styles.scrollView}
                horizontal={true}
                name={"lazyload-home-"+key}
              >
               {
                  dataList[key].map((data, index) => {
                    return (
                      <TouchableOpacity key={key + '_' + index} onPress={() => this.props.navigator.push({
                                                                                      id: data.id,
                                                                                      component: DetailsCategory,
                                                                                      navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                                                                        statusBar = {{ hidden: true }}
                                                                                                        leftButton = { this.renderBackButton() }
                                                                                                        style={styles.navigationBar}
                                                                                                        rightButton = { this.renderNavIconSearch() } />
                                                                                    })}>
                      <View style={[{width: ((width*3/7) - 10), height: (((width*3/7) / 16 * 9) + 15), marginRight: 5, overflow: 'hidden'}]}>
                          <LazyloadImage
                              resizeMode="contain"
                              style={[styles.centering, { width: ((width*3/7) - 10), height: ((width*3/7) / 16 * 9), flex: 1 }]}
                              source={{uri: data.images[imageDevice]}}
                              onLoadEnd={(e) => this.setState({imageLoading: false})}
                              host={"lazyload-home-"+key}
                          >
                              <ActivityIndicator animating={this.state.imageLoading} size="small" />
                          </LazyloadImage>

                          <LazyloadView style={styles.titleContainer, [{width: ((width*3/7) - 10)}]} host={"lazyload-home-"+key}>
                            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{data.name}</Text>
                          </LazyloadView>
                      </View>
                      </TouchableOpacity>
                    )
                 })
               }
             </LazyloadScrollView>
           </View>
      )
  }

  render() {
    return (
      <View style={styles.scrollContainer}>
        { this.state.dataList && this.renderData(this.state.dataList) }
      </View>
    );
  }
}
