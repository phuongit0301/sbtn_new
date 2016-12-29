import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator, Animated, Easing, AsyncStorage } from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';
import DetailsCategory from '../categories/DetailsCategory';
import Swiper from 'react-native-swiper'

import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-elements';

let {width, height} = Dimensions.get('window');

export default class ItemPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      rate: 1.0,
      volume: 1.0,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      dataAudio: [],
      imageLoading: true,
      linkVideo: '',
      spinValue: new Animated.Value(0)
    });
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false
    });
  }

  onProgress(data) {
    this.setState({
        currentTime: data.currentTime
    });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  componentDidMount(){
    var that = this;
    this.spin();
    this.props.navigator.navigationContext.addListener('willfocus', (event) => {
       this.setState({
         paused: true
       });
    });

    this.dataAudio().done();
  }

  async dataAudio() {
    await AsyncStorage.getAllKeys((err, keys) => {
      if(keys === 'dataAudio' || keys === 'hasAudio') {
          AsyncStorage.multiRemove(keys);
      }
    });
    await AsyncStorage.setItem("dataAudio", JSON.stringify(this.props.dataAudio));
    await AsyncStorage.setItem("hasAudio", JSON.stringify('false'));
  }

  spin() {
    this.state.spinValue.setValue(0);
  	Animated.timing(
    	this.state.spinValue,
      {
      	toValue: 1,
        duration: 10000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  onPaused() {
    this.setState({paused: !this.state.paused});
  }

  renderBackButton(mode) {
    return(
      <View>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.jumpBack(mode)} />
      </View>
    )
  }

  jumpBack(mode) {
    this.props.onAudio(true);
    this.props.navigator.jumpBack();
  }

  renderLogoNavBar() {
    return(
        <View style={styles.logoNavBarAudio}>
          <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
            <Text style={[styles.logoAudio]}>SBTN</Text>
          </TouchableOpacity>
        </View>
    )
  }

  render() {

    let flexCompleted = this.getCurrentTimePercentage() * 100;
    let flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    const getStartValue = () => '0deg';
    const getEndValue = () => '360deg';

    const spin = this.state.spinValue.interpolate({
       inputRange: [0, 1],
       outputRange: [getStartValue(), getEndValue()]
     });

    const rowLive = this.props.dataAudio.isLive ? styles.rowBottom : styles.rowBottomNoLive;

    return (
      <Animated.View style={[styles.container]} shouldRasterizeIOS={true} renderToHardwareTextureAndroid={true}>
        <Image source={{uri: this.props.dataAudio.image}} style={{height: height}} blurRadius={40}>
           <View style={[styles.column, {flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}]}>
             <View style={[styles.navigationBarAudio, styles.row]}>
                { this.renderBackButton(this.props.dataAudio.mode) }
                { this.renderLogoNavBar() }
             </View>

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
                  playInBackground={false}       // Audio continues to play when app entering background.
                  playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
                  progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                  onLoad={this.onLoad}      // Callback when video loads
                  onProgress={this.onProgress}      // Callback every ~250ms with currentTime
                  onEnd={this.onEnd}             // Callback when playback finishes
                  onError={this.videoError}      // Callback when video cannot be loaded
               />

               <Swiper showsPagination={true}
                        dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        loop={false}
                        index={1}
                        paginationStyle={styles.paginationAudio}
               >
                 <View style={styles.wrapperAudioSwipper}>
                  <Text style={styles.white}>And simple</Text>
                 </View>

                 <View style={styles.wrapperAudioSwipper}>
                   <Animated.Image source={{uri: this.props.dataAudio.image}}
                                    style={[{width: width - 50, height: width - 50, borderRadius: ((width - 50)/2), transform: [{rotate: spin}]}]}
                                    onLoadEnd={(e) => this.setState({imageLoading: false})}
                    >
                       <ActivityIndicator animating={this.state.imageLoading} size="small" />
                   </Animated.Image>
                 </View>

                 <View style={styles.wrapperAudioSwipper}>
                   <Text style={styles.white}>And simple</Text>
                 </View>
               </Swiper>

           </View>

           <View style={[styles.column, {alignItems: 'center', justifyContent: 'flex-end', padding: 10}]}>

              <View style={styles.rowBottom}><Text style={styles.white}>{this.props.dataAudio.name}</Text></View>

              <View style={[styles.row, rowLive]}>

                  {
                    this.props.dataAudio.isLive ?
                      <View style={[styles.isLive, styles.row]}>
                        <Icon
                          name='circle'
                          type='font-awesome'
                          color='red'
                          size={4}
                        />
                        <Text style={[styles.white, styles.isLiveText]}>Live</Text>
                      </View>
                    : null
                  }

                  <View style={styles.trackingControls}>
                    <View style={styles.progress}>
                      <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
                      <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
                    </View>
                  </View>

              </View>

              <View style={[styles.row, styles.rowBottom]}>
                <View style={styles.iconRandom}>
                   <Icon
                     name='random'
                     type='font-awesome'
                     color='white'
                     size={12}
                     onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
                   />
                </View>

                  <View style={styles.groupButtonRadio}>
                     <Icon
                       name='step-backward'
                       type='font-awesome'
                       color='white'
                       size={16}
                       containerStyle={styles.onBackward()}
                       onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
                     />

                     {
                       this.state.paused || flexCompleted == 0 ?
                         <Icon
                           name='play'
                           type='font-awesome'
                           color='white'
                           size={16}
                           containerStyle={styles.circlePlay}
                           onPress={() => this.onPaused()}
                         />
                       :
                         <Icon
                           name='pause'
                           type='font-awesome'
                           color='#fff'
                           size={12}
                           containerStyle={styles.circlePause}
                           onPress={() => this.onPaused()} />
                     }

                   <Icon
                     name='step-forward'
                     type='font-awesome'
                     color='white'
                     size={16}
                     containerStyle={styles.circle}
                     onPress={() => this.onForward(this.state.dataAudio.mp3_link)}
                   />


               </View>

               <View style={styles.iconList}>
                 <Icon
                   name='refresh'
                   type='font-awesome'
                   color='white'
                   size={12}
                   onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
                 />
               </View>

             </View>
           </View>
         </Image>
      </Animated.View>
    )
  }
}
