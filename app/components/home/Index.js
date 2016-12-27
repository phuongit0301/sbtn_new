'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import ImageSlider from 'react-native-image-slider';
import ListItem from './ListItem';
import ListItemListen from './ListItemListen';
import Slider from '../general/Slider';
import styles from '../../styles/Style';
import constants from '../../constants/Types';
const { REQUEST_HOME_URL } = constants;

const { width, height } = Dimensions.get('window');

export default class HomeView extends Component {

  static propsType = {
    onCategoryItemSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dataAuthorization: '',

      listImageSlide: [],
      listDataView: null,
      listDataListen: null,
      loaded: false,
    };
  }

  componentDidMount() {
      this._generateAuthorization().done();
  }

  async _generateAuthorization() {
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
      let response = await fetch(REQUEST_HOME_URL, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                  }
                                });
      let responseData = await response.json();


      this.setState({
        listImageSlide: responseData.banners,
        listDataView: responseData.view,
        listDataListen: responseData.listen,
        loaded: true
      })
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return(
      <View style={styles.container}>
          {
            this.state.loaded ?
              <ScrollView>
                <Slider listImageSlide={this.state.listImageSlide} navigator={this.props.navigator} />
                <ListItem dataList={this.state.listDataView} onCategoryItemSelected={this.props.onCategoryItemSelected} navigator={this.props.navigator} />
                <ListItemListen dataList={this.state.listDataListen} onCategoryItemSelected={this.props.onCategoryItemSelected} navigator={this.props.navigator} />
              </ScrollView>
            : null
          }
      </View>
   )
  }
}
