import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, ScrollView, Dimensions, AsyncStorage, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import Row from '../categories/RowListCategories';
import DetailsCategory from '../categories/DetailsCategory';
import RowListItemCategory from '../categories/RowListItemCategory';
import ItemAudioPlayerBottom from '../player/ItemAudioPlayerBottom';
import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';

const { width, height } = Dimensions.get('window');
const imageWidth = (width/2) - 5;
const imageHeight = (width/2)/16*9;

import constants from '../../constants/Types';
const {
  REQUEST_PACKAGE_MY_CONTENTS_URL
} = constants;

export default class PurchasedContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataListPurchased: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      imageSize: null,
      containerImageSize: null,
      categoryID: null,
      hasRadio: false,
      moreShow: false,
      authorization: {},
      imageLoading: true
    }
  }

  componentWillMount() {
    let authorization = this.getAuthorization().done();
  }

  async getAuthorization() {
    let authorization = await AsyncStorage.getItem('authorizationPost');

    this._fetchData(JSON.parse(authorization)).done();

    this.setState({
      authorization: JSON.parse(authorization)
    })
  }

  async _fetchData(authorization) {
    try {
      let response = await fetch(REQUEST_PACKAGE_MY_CONTENTS_URL, {
                                  method: 'POST',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                    'Authorization': authorization.Authorization
                                  }
                                });
      let responseJson = await response.json();

      this.setState({
        dataListPurchased: this.state.dataListPurchased.cloneWithRows(responseJson.groups),
        loaded: !this.state.loaded,
      });
    } catch(error) {
      console.error(error);
    }
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
          onPress={() => this.jumpBack().done()} />
      </View>
    )
  }

  async jumpBack() {
    AsyncStorage.setItem('hasAudio', JSON.stringify('true'));
    this.props.navigator.jumpBack();
  }

  renderNavIconSearch(mode) {
    return(
      <View style={styles.iconSearch}>
        {
          mode != 0 ?
            <Icon
              name='search'
              type='font-awesome'
              color='#fff'
              size={15}
              onPress={() => this.bindOnPress()}
              />
            : null
        }

      </View>
    )
  }

  bindOnPress() {
    this.props.navigator.push({
                          id: null,
                          title: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderBackButton()}
                          style={styles.navigationBar} />
      })
  }

  bindMoreItem(id, items) {

    this.props.navigator.push({
                                id: this.props.selectedMenuId,
                                title: 'ROWLISTITEMCATEGORY',
                                component: RowListItemCategory,
                                childCategoryID: id,
                                moreItemsData: items,
                                navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                  leftButton = { this.renderBackButton() }
                                                  style={styles.navigationBar}
                                                  rightButton = { this.renderNavIconSearch() } />
                              });

  }

  renderRowItem(rowData) {
    return (
      <View style={styles.container}>
          <View style={[styles.sectionHeader]}>
              <Text style={styles.sectionText}>{rowData.name}</Text>
            {
              rowData.items.length > 6 ?
                <TouchableOpacity style={styles.textRight} onPress = { () => this.bindMoreItem(rowData.id, rowData.items) }>
                    <Text style={styles.btnMore}>More</Text>
                </TouchableOpacity>
              : null
            }
          </View>

          <View style={[styles.blocks]}>
            {
              rowData.items.map((data, index) => {
                const visibility = index > 5 ? styles.hidden : { width: imageWidth, height: imageHeight + 20};
                return(
                  <View key={this.props.id + '_' + index} style={visibility}>
                    <TouchableOpacity onPress = { () => this.props.navigator.push({
                                                id: data.id,
                                                component: DetailsCategory,
                                                navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                                  leftButton = { this.renderBackButton() }
                                                                  style={styles.navigationBar}
                                                                  rightButton = { this.renderNavIconSearch(rowData.mode) } />
                                              }) }>
                      <View style={[styles.thumbnailContainer, styles.column]}>
                        <Image source={{uri: data.image}} style={[styles.centering, { width: imageWidth, height: imageHeight }]}
                          onLoadEnd={(e) => this.setState({imageLoading: false})}
                        >
                          <ActivityIndicator animating={this.state.imageLoading} size="small" />
                        </Image>
                        <View style={styles.titleContainer}>
                          <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{data.name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
      </View>
    )
  }

  render() {

    return(
      <View style={styles.container}>

          <ListView
            dataSource = {this.state.dataListPurchased}
            renderRow = {this.renderRowItem.bind(this)}
          />

      </View>
   );
  }
}
