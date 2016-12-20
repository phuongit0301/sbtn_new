import React, {Component} from 'react';

import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  Image,
  ListView,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import ItemPlayer from '../player/ItemPlayer';
import styles from '../../styles/Style';

import constants from '../../constants/Types';
const {
  REQUEST_DETAIL_URL
} = constants;

const { width, height } = Dimensions.get('window');

export default class DetailsCategory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataListCategories: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataVideo: [],
      dataRelate: [],
      loaded: false,
      categoryID: null,
      authorization: {}
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
      let response = await fetch(REQUEST_DETAIL_URL + '/' + this.props.route.id, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                  }
                                });
      let responseJson = await response.json();

      const imageWidth = (width/2) - 5;
      const imageHeight = (width/2)/16*9;

      //check if type is timelines
      let dataVideo = (this.props.route.title === 'timelines' && this.props.route.timeline) ? this.props.route.timeline : responseJson.content;

      this.setState({
        dataRelate: responseJson,
        dataVideo: dataVideo,
        loaded: !this.state.loaded,
        categoryID: this.props.selectedMenuId
      });
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return(
        this.state.loaded ?
            <ItemPlayer navigator={this.props.navigator} dataVideo={this.state.dataVideo} dataRelate={this.state.dataRelate} onAudio={this.props.onAudio} />
        :
        <ActivityIndicator
          style={[styles.waiting]}
          color="white"
        />
   );
  }
}
