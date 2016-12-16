'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';

export default class PurchasedContentButton extends Component {
  render() {

    return(
      <TouchableOpacity onPress={() => this.props.onItemSelected({name: 'PURCHASEDCONTENT'})}>
        <View style = { styles.NavIconMenu } >
          <Text style={styles.white}>Your Purchased Content</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
