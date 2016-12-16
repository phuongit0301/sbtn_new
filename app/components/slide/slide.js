import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import styles from '../../styles/Style';

export default class ImageSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: Dimensions.get('window').width * (4 / 9),
      width: Dimensions.get('window').width
    }
  }

  render() {
    return(
      <View style={styles.containerSlide}>
        {
          this.props.images.length > 0 ?
            this.props.images.map((imageUri, index) => {
              return (
                <View key={index} style={this.props.styles}>
                  <TouchableOpacity style={this.props.styles}>
                    <Image source={{uri: imageUri}} style={this.props.styles} />
                  </TouchableOpacity>
                </View>
              );
            })
            :
            <View></View>
        }
      </View>
    );
  }
}
