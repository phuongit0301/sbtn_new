import React, {Component} from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, TouchableHighlight, Image, AsyncStorage, Dimensions, Modal, Alert } from 'react-native';
import constants from '../../constants/Types';
const { REQUEST_PAYMENT_PROMOTION_URL } = constants;

export default class Promotion extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    this.checkPromotion().done();
  }

  async checkPromotion() {
    let authorization = await AsyncStorage.getItem('authorization');
    try {
      authorization = JSON.parse(authorization);

      let response = await fetch(REQUEST_PAYMENT_PROMOTION_URL + this.props.promotionCode , {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken,
                                    'Authorization': authorization.Authorization
                                  }
                                });
      let responseJson = await response.json();
      this.setState({
        data: responseJson
      });
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    return(
      this.state.data.error != 0 ?
        Alert.alert(
          'Message',
          this.state.data.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      : null
    )
  }

}
