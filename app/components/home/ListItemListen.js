import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ListView, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
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

export default class ListItemListen extends Component {
  static propsType = {
    onCategoryItemSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
      super(props);
      this.state = ({
        dataList: null,
        width: 0,
        imageLoading: true
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
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} statusBar = {{ hidden: true }} leftButton={this.renderBackButton()}
                          style={styles.navigationBar} />
      })
  }

  componentWillMount() {
    this.setState({
      dataList: this.props.dataList,
      dataListListen: this.props.dataListListen,
      imageSize: { width: width*3/4, height: (width*3/4) / 16*9 },
      containerImageSize: { width: width*3/4, height: (width*3/4) / 16*9 },
      width: width/2,
    })
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
                contentContainerStyle={[styles.content, {width: ((len*3/4) * (width - 5)) }]}
                style={styles.scrollView}
                horizontal={true}
                name={"lazyload-home-listen-"+key}
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
                      <View style={[{width: ((width*3/4) - 10), height: (((width*3/4) + 35) / 16 * 9), marginRight: 5, overflow: 'hidden'}]}>
                          <LazyloadImage
                              resizeMode="contain"
                              style={[styles.centering, { width: undefined, height: undefined, flex: 1 }]}
                              source={{uri: data.images[imageDevice]}}
                              onLoadEnd={(e) => this.setState({imageLoading: false})}
                              host={"lazyload-home-listen-"+key}
                          >
                              <ActivityIndicator animating={this.state.imageLoading} size="small" />
                          </LazyloadImage>

                          <LazyloadView style={styles.titleContainer, [{width: this.state.width}]} host={"lazyload-home-listen-"+key}>
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
        { this.state.dataList ? this.renderData(this.state.dataList) : null }
      </View>
    );
  }
}
