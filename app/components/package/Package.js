import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Image, AsyncStorage, Dimensions } from 'react-native';
import styles from '../../styles/Style';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import constants from '../../constants/Types';
import PackageDetails from './PackageDetails';
import Search from '../search/Search';
const { REQUEST_PACKAGE_LIST_ALL_URL } = constants;
const {width, height} = Dimensions.get('window');

export default class PackageView extends Component {

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
    this.getAllPackage().done();
  }

  async getAllPackage() {
    let authorization = await AsyncStorage.getItem('authorizationGet');
    try {
      authorization = JSON.parse(authorization);

      let response = await fetch(REQUEST_PACKAGE_LIST_ALL_URL, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken
                                  }
                                });
      let responseJson = await response.json();
      this.setState({
        listPackages: this.state.listPackages.cloneWithRows(responseJson.data),
        loaded: !this.state.loaded,
        authorization: authorization
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
                                            statusBar = {{ hidden: true }} style={styles.navigationBar} />
      })
  }

  renderRowItem(rowData) {

    return(
      <TouchableOpacity onPress={() => this.props.navigator.push({
                            id: null,
                            title: 'PACKAGE DETAILS',
                            component: PackageDetails,
                            items: rowData.items,
                            navigationBar: <NavigationBar
                                                title={this.renderLogoNavBar()}
                                                statusBar = {{ hidden: true }}
                                                leftButton={this.renderBackButton()}
                                                rightButton={this.renderNavIconSearch()}
                                                style={styles.navigationBar} />
                          })}
      >
        <View style={styles.column}>
          <View style={[styles.row]}>
            <Image source={{uri: rowData.image}} style={{width: width/3, height: width/3, borderRadius: width/6}} />

            <View style={styles.column}>
              <Text style={styles.white}>{rowData.group_name}</Text>
              <Text style={styles.white}>{rowData.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
