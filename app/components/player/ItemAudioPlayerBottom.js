import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  AsyncStorage
} from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';

import { Icon } from 'react-native-elements';

const REQUEST_URL_DETAILS = 'http://ottapi.com/v1.7/sbtn/detail/index/';

let {width, height} = Dimensions.get('window');

export default class ItemAudioPlayerBottom extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      rate: 1.0,
      volume: 1.0,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
      dataAudio: [],
      linkVideo: '',
      hasAudio: false
    });
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  componentWillMount() {
    //this._fetchData(this.props.authorization).done();

    this.setState({
      dataAudio: this.props.dataAudio,
      hasAudio: this.props.hasAudio
    })
  }

  async _fetchData(dataResponse) {
    try {
      let url = REQUEST_URL_DETAILS + '/' + this.props.idAudio;
      let response = await fetch(url, {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': dataResponse.DateTime,
                                    'RequestToken': dataResponse.RequestToken
                                  }
                                });
      let responseJson = await response.json();
      this.setState({
        dataAudio: responseJson.content
      });
    } catch(error) {
      console.error(error);
    }
  }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false
    });
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  componentWillUnmount() {
    this.closeAudio();
  }

  onPaused() {
    this.setState({paused: !this.state.paused});
  }

  closeAudio() {

    this.setState({
      paused: !this.state.paused,
      dataAudio: null
    });

    AsyncStorage.removeItem('dataAudio');
  }

  render() {

    return (
        this.state.dataAudio ?
            <View style={[styles.containerAudioBottom, styles.timelinesSectionHeaderBgColor]}>
              <View style={styles.row}>
                 <Video source={{uri: this.props.dataAudio.link}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                    ref={(ref) => {
                      this.player = ref
                    }}                             // Store reference
                    rate={this.state.rate}                     // 0 is paused, 1 is normal.
                    volume={this.state.volume}                  // 0 is muted, 1 is normal.
                    muted={false}                  // Mutes the audio entirely.
                    paused={this.state.paused}                // Pauses playback entirely.
                    resizeMode="cover"             // Fill the whole screen at aspect ratio.
                    repeat={true}                  // Repeat forever.
                    playInBackground={true}       // Audio continues to play when app entering background.
                    playWhenInactive={true}       // [iOS] Video continues to play when control or notification center are shown.
                    progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                    onLoadStart={this.loadStart}   // Callback when video starts to load
                    onLoad={this.onLoad}      // Callback when video loads
                    onProgress={this.onProgress}      // Callback every ~250ms with currentTime
                    onEnd={this.onEnd}             // Callback when playback finishes
                    onError={this.videoError}      // Callback when video cannot be loaded
                 />

                   <View style={styles.wrapperCloseButton}>
                     <Icon
                       name='close'
                       type='font-awesome'
                       color='white'
                       size={12}
                       containerStyle={styles.circleCloseButtonBottom}
                       onPress={() => this.closeAudio()}
                     />
                   </View>

                   <Image source={{uri: this.state.dataAudio.image}} style={{width: 50, height: 50, borderRadius: 25}} />
                   <View style={styles.wrapperTextBottom}><Text style={styles.white}>{this.state.dataAudio.name}</Text></View>
                   <View style={styles.groupButtonRadio}>
                      <Icon
                        name='step-backward'
                        type='font-awesome'
                        color='white'
                        size={18}
                        containerStyle={styles.circleBottom}
                        onPress={() => this.onBackward(this.state.dataAudio.mp3_link)}
                      />

                      {
                        this.state.paused ?
                          <Icon
                            name='play'
                            type='font-awesome'
                            color='white'
                            size={18}
                            containerStyle={styles.circlePlayBottom}
                            onPress={() => this.onPaused()}
                          />
                        :
                          <Icon
                            name='pause'
                            type='font-awesome'
                            color='#fff'
                            size={18}
                            containerStyle={styles.circlePauseBottom}
                            onPress={() => this.onPaused()} />
                      }

                    <Icon
                      name='step-forward'
                      type='font-awesome'
                      color='white'
                      size={18}
                      containerStyle={styles.circleBottom}
                      onPress={() => this.onForward(this.state.dataAudio.mp3_link)}
                    />
                  </View>
             </View>
           </View>
       : <View></View>
    )
  }
}
