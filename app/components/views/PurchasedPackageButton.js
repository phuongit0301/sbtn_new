'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';

export default class PurchasedPackageButton extends Component {
  render() {

    return(
      <TouchableOpacity onPress={() => this.props.onItemSelected({name: 'PURCHASEDPACKAGE'})}>
        <View style = { styles.NavIconMenu } >
          <Text style={styles.white}>Your Purchased Package</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
