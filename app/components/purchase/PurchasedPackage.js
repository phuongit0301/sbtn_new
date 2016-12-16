import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Image, AsyncStorage, Dimensions } from 'react-native';
import styles from '../../styles/Style';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import constants from '../../constants/Types';
import PackageDetails from '../package/PackageDetails';
import Search from '../search/Search';
const { REQUEST_PACKAGE_LIST_PAYMENT_URL } = constants;
const {width, height} = Dimensions.get('window');

export default class PurchasedPackage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authorization: '',
      listPackages: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentWillMount() {
    this.getAuthorization().done();
  }

  async getAuthorization() {
    let authorization = await AsyncStorage.getItem('authorizationPost');

    this._fetchData(JSON.parse(authorization)).done();

    this.setState({
      authorizationPost: JSON.parse(authorization)
    })
  }

  async _fetchData(authorization) {
    try {
      let response = await fetch(REQUEST_PACKAGE_LIST_PAYMENT_URL, {
                                  method: 'POST',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                    'Authorization': authorization.Authorization
                                  }
                                });
      let responseJson = await response.json();

      this.setState({
        listPackages: this.state.listPackages.cloneWithRows(responseJson.data),
        loaded: !this.state.loaded,
      });
    } catch(error) {
      console.error(error);
    }
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
          onPress={() => this.props.navigator.popToTop()} />
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

  renderRowItem(rowData) {

    return(
        <View style={styles.column}>
          <View style={[styles.row]}>
            <Image source={{uri: rowData.image}} style={{width: width/3, height: width/3, borderRadius: width/6}} />

            <View style={styles.column}>
              <Text style={styles.white}>{rowData.group_name}</Text>
              <Text style={styles.white}>{rowData.description}</Text>
            </View>
          </View>
        </View>
    );
  }

  render() {
    return(
      <View style={[styles.container]}>
        {
          this.state.loaded ?
            <ListView
              dataSource = {this.state.listPackages}
              renderRow = {this.renderRowItem.bind(this)}
            />
          : null
        }
      </View>
   );
  }

}
