import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import styles from '../../styles/Style';
import Row from './Row';
import AppView from '../general/App';

import constants from '../../constants/Types';
const {
  REQUEST_MENU_URL
} = constants;

export default class MenuContentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      authorization: {},
      dataMenuCategory: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),

    };
  }
  componentDidMount() {
    this._generateAuthorization().done();
  }

  async _generateAuthorization(url) {
    try {
      let authorization = await AsyncStorage.getItem('authorizationGet');

      this._fetchData(JSON.parse(authorization)).done();

      this.setState({
        authorization: JSON.parse(authorization)
      })
    } catch(error) {
      console.error(error);
    }
  }

  async _fetchData(authorization) {
    try {
      let response = await fetch(REQUEST_MENU_URL, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                  }
                                });
      let responseJson = await response.json();

      //check if type is timelines
      this.setState({
        dataMenuCategory: this.state.dataMenuCategory.cloneWithRowsAndSections(responseJson)
      });
    } catch(error) {
      console.error(error);
    }
  }

  renderMenuItem(menuItem) {
    return(
      <View style = {styles.menuContentItemView}>
        <Text style = {styles.menuContentItemText}>{menuItem.name}</Text>
      </View>
    );
  }
  renderSectionHeader(data, sectionId) {
    return (
      <View style={styles.menuContentHeadView}>
          <Text style={styles.menuContentHeadText}>{ sectionId ? sectionId : '' }</Text>
      </View>
    );
  }

  renderRowItem(rowData) {
    return(
      <TouchableHighlight onPress={ () => this.props.onItemSelected({id: rowData.id, name: 'CATEGORIES'}) }>
        <Text style={styles.menuContentItemText}>
          {rowData.name}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return(
      <ScrollView style = {styles.menuContentView}>
        <View style = {styles.menuContentItemView}>
          <Text style = {styles.menuContentItemText} onPress = { () => this.props.onItemSelected({name: 'HOME'}) }>HOME</Text>
        </View>
        <View style = {styles.menuContentItemView}>
          <Text style = {styles.menuContentItemText} onPress = { () => this.props.onItemSelected({name: 'PACKAGE'}) } >PACKAGE</Text>
        </View>

        <View>
          <ListView
            dataSource = {this.state.dataMenuCategory}
            renderRow = {this.renderRowItem.bind(this)}
            renderSectionHeader={this.renderSectionHeader}
          />
        </View>
      </ScrollView>
    );
  }
}
