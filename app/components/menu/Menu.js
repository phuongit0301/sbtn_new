import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import styles from '../../styles/Style';
import Row from './Row';
import AppView from '../general/App';

let REQUEST_URL = 'https://ottapi.com/v1.7/sbtn/index/generateauthorization?key=0tt@pi.C0m_Med1@&token=cab9f50230778df5c52b4ccb4d12d6ca';
let REQUEST_URL_MENU = 'https://ottapi.com/v1.7/sbtn/home/menu';

export default class MenuContentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      dataMenuCategory: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      dataMenuProvider: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  componentDidMount() {
    this._generateAuthorization(REQUEST_URL);
  }

  _generateAuthorization(url) {
    return fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        this._fetchData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _fetchData(dataResponse) {
    return fetch(REQUEST_URL_MENU, {
      method: 'GET',
      headers: {
        'DateTime': dataResponse.DateTime,
        'RequestToken': dataResponse.RequestToken,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          dataMenuCategory: this.state.dataSource.cloneWithRowsAndSections(responseData),
          dataMenuProvider: this.state.dataSource.cloneWithRows(responseData),
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
