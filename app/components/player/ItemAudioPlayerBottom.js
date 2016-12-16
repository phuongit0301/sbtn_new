import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator, Animated, Easing, AsyncStorage } from 'react-native';
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

  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps');
  //   console.log(nextProps);
  //   // this.setState({
  //   //   hasRadio: !this.props.hasRadio,
  //   //   paused: false
  //   // })
  // }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false
    });
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  // componentDidMount() {
  //   console.log(this.props.hasAudio);
  //   if(this.props.hasAudio) {
  //     this.props.navigator.navigationContext.addListener('willfocus', (event) => {
  //       console.log(this.props);
  //        this.setState({
  //          paused: true
  //        });
  //     });
  //   }
  // }

  componentWillUnmount() {
    this.closeAudio();
  }

  onPaused() {
    this.setState({paused: !this.state.paused});
  }

  closeAudio() {

    this.setState({
      paused: !this.state.paused,
      hasAudio: false
    });
  }

  render() {

    return (
        this.state.hasAudio.toString() == 'true' ?
            <View style={[styles.containerAudioBottom, styles.timelinesSectionHeaderBgColor]}>
              <View style={styles.row}>
                 <Video source={{uri: 'http://s82.stream.nixcdn.com/6f006f16b7b7c00f8664c9478894df1c/584fa983/NhacCuaTui929/PhiaSauMotCoGai-SoobinHoangSon-4632323.mp3'}} // Looks for .mp4 file (background.mp4) in the given expansion version.
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
                       size={8}
                       containerStyle={styles.circleCloseButtonBottom}
                       onPress={() => this.closeAudio()}
                     />
                   </View>

                   <Image source={{uri: this.state.dataAudio.image}} style={{width: 30, height: 30, borderRadius: 15}} />
                   <View style={styles.wrapperTextBottom}><Text style={styles.white}>{this.state.dataAudio.name}</Text></View>
                   <View style={styles.groupButtonRadio}>
                      <Icon
                        name='step-backward'
                        type='font-awesome'
                        color='white'
                        size={16}
                        containerStyle={styles.circleBottom}
                        onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
                      />

                      {
                        this.state.paused ?
                          <Icon
                            name='play'
                            type='font-awesome'
                            color='white'
                            size={16}
                            containerStyle={styles.circlePlayBottom}
                            onPress={() => this.onPaused()}
                          />
                        :
                          <Icon
                            name='pause'
                            type='font-awesome'
                            color='#fff'
                            size={16}
                            containerStyle={styles.circlePauseBottom}
                            onPress={() => this.onPaused()} />
                      }

                    <Icon
                      name='step-forward'
                      type='font-awesome'
                      color='white'
                      size={16}
                      containerStyle={styles.circleBottom}
                      onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
                    />
                  </View>
             </View>
           </View>
       : <View></View>
    )
  }
}
