import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ListView, Dimensions, ScrollView, TouchableHighlight} from 'react-native';

import Row from './RowListItemCategory';
import styles from '../../styles/Style';
import constants from '../../constants/Types';
const {
  REQUEST_URL_LIST_CATEGORIES
} = constants;

const { width, height } = Dimensions.get('window');

export default class ListItemsCategory extends Component {
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
    }
  }

  componentWillMount() {
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
      let response = await fetch(REQUEST_URL_LIST_CATEGORIES, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                    'categoryID': this.props.selectedMenuId
                                  }
                                });
      let responseJson = await response.json();
      var itemCategory = [];

      responseJson.groups.map((data) => {
        if(data.id == this.props.childCategoryID) {
          itemCategory.push(data);
        }
      });

      const imageWidth = (width/2) - 5;
      const imageHeight = (width/2)/16*9;
      this.setState({
        dataListCategories: this.state.dataListCategories.cloneWithRows(itemCategory),
        loaded: !this.state.loaded,
        imageSize: { width: imageWidth, height: imageHeight },
        containerImageSize: { width: imageWidth, height: imageHeight + 20},
        categoryID: this.props.selectedMenuId
      });
    } catch(error) {
      console.error(error);
    }
  }

  renderRowItem(rowData) {
   return <Row {...rowData} navigator={this.props.navigator} imageSize={this.state.imageSize} containerImageSize={this.state.containerImageSize} style={styles.row} onCategoryItemSelected={this.props.onCategoryItemSelected} categoryID= {this.state.categoryID} />
  }

  render() {
    return(
        <View style={styles.container}>
          <ScrollView style={styles.container}>
            <ListView
              dataSource = {this.state.dataListCategories}
              renderRow = {this.renderRowItem.bind(this)}
              contentContainerStyle={styles.list}
              enableEmptySections={true}
            />
          </ScrollView>
      </View>
   );
  }
}
