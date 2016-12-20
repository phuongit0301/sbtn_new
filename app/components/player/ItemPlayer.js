import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, AppState, ActivityIndicator } from 'react-native';
import styles from '../../styles/Style';
import { Icon } from 'react-native-elements';
import ItemVideoPlayer from './ItemVideoPlayer';
import ItemAudioPlayer from './ItemAudioPlayer';

let {width, height} = Dimensions.get('window');

export default class ItemPlayer extends Component {
  render() {
    return (
        this.props.dataVideo.mode == 0 ?
          <ItemAudioPlayer dataAudio={this.props.dataVideo} navigator={this.props.navigator} onAudio={this.props.onAudio} />
        :
          <ItemVideoPlayer dataVideo={this.props.dataVideo} dataRelate={this.props.dataRelate} navigator={this.props.navigator} />
    )
  }
}
