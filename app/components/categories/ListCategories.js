import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, ScrollView, Dimensions, AsyncStorage, TouchableOpacity, Image } from 'react-native';

import Row from './RowListCategories';
import DetailsCategory from './DetailsCategory';
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
  REQUEST_URL_LIST_CATEGORIES
} = constants;


export default class ListCategories extends Component {

  static propsType = {
    onCategoryItemSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dataListCategories: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      imageSize: null,
      containerImageSize: null,
      categoryID: null,
      hasRadio: false,
      moreShow: false,
      authorization: {}
    }
  }

  componentWillMount() {
    let authorization = this.getAuthorization().done();
  }

  async getAuthorization() {
    let authorization = await AsyncStorage.getItem('authorizationGet');

    this._fetchData(JSON.parse(authorization)).done();

    this.setState({
      authorization: JSON.parse(authorization)
    })
  }

   componentWillReceiveProps(nextProps) {
    if(nextProps.selectedMenuId !== this.props.selectedMenuId) {
       this._fetchData(this.state.authorization, nextProps.selectedMenuId).done();
    }
   }

  async _fetchData(authorization, selectedMenuId) {
    try {
      let categoriesId = selectedMenuId ? selectedMenuId : this.props.selectedMenuId;
      let url = REQUEST_URL_LIST_CATEGORIES + '?category_id=' + categoriesId;
      let response = await fetch(url, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken
                                  }
                                });
      let responseJson = await response.json();
      this.setState({
        dataListCategories: this.state.dataListCategories.cloneWithRows(responseJson.groups),
        loaded: !this.state.loaded,
        categoryID: this.props.selectedMenuId
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
    //let dataAudio = await AsyncStorage.getItem('dataAudio');
    AsyncStorage.setItem('hasAudio', JSON.stringify('true'));
    //dataRadio = JSON.parse(dataRadio);
    // this.setState({
    //   dataRadio: dataRadio
    // })
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
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} statusBar = {{ hidden: true }} leftButton={this.renderBackButton()}
                          style={styles.navigationBar} />
      })
  }

  // bindOnDetail(id, mode) {
  //
  //   this.setState({
  //     hasRadio: false
  //   })
  //
  //   this.props.navigator.push({
  //                               id: id,
  //                               component: DetailsCategory,
  //                               navigationBar: <NavigationBar title={this.renderLogoNavBar()}
  //                                                 statusBar = {{ hidden: true }}
  //                                                 leftButton = { this.renderBackButton(id, mode) }
  //                                                 style={styles.navigationBar}
  //                                                 rightButton = { this.renderNavIconSearch(mode) } />
  //                             })
  // }

  bindMoreItem(id, items) {

    //console.log(this.props);
    this.props.navigator.push({
                                id: this.props.selectedMenuId,
                                title: 'ROWLISTITEMCATEGORY',
                                component: RowListItemCategory,
                                childCategoryID: id,
                                moreItemsData: items,
                                navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                  statusBar = {{ hidden: true }}
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
                                                                  statusBar = {{ hidden: true }}
                                                                  leftButton = { this.renderBackButton() }
                                                                  style={styles.navigationBar}
                                                                  rightButton = { this.renderNavIconSearch(rowData.mode) } />
                                              }) }>
                      <View style={[styles.thumbnailContainer, styles.column]}>
                        <Image source={{uri: data.image}} style={{ width: imageWidth, height: imageHeight }} />
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
            dataSource = {this.state.dataListCategories}
            renderRow = {this.renderRowItem.bind(this)}
          />

      </View>
   );
  }
}
