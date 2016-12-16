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
import Row from './Row';
import ListItem from './ListItem';
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
      screenSize: { width, height },
      imgBannerSize: { width: width, height: width / 16 * 9 },
      dataAuthorization: '',

      listImageSlide: [],
      listDataView: null,
      listDataListen:null,
      position: 1,
      interval: null,
    };
  }

  componentWillMount() {
      this._generateAuthorization().done();

      this.setState({interval: setInterval(() => {
          this.setState({position: this.state.position === this.state.listImageSlide.length ? 0 : this.state.position + 1});
      }, 2000)});
  }

  componentWillUnmount() {
      clearInterval(this.state.interval);
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
        listImageSlide: responseData.banners || [],
        listDataView: responseData.view || [],
        listDataListen: responseData.listen || [],
      })
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          <Slider listImageSlide={this.state.listImageSlide} position={this.state.position}
                      onPositionChanged={position => this.setState({position})} />
          <ListItem dataList={this.state.listDataView} onCategoryItemSelected={this.props.onCategoryItemSelected} navigator={this.props.navigator} />
          <ListItem dataList={this.state.listDataListen} onCategoryItemSelected={this.props.onCategoryItemSelected} navigator={this.props.navigator} />

        </ScrollView>
      </View>
   )
  }
}
