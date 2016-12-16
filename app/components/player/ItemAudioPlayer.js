import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator, Animated, Easing, AsyncStorage } from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';
import DetailsCategory from '../categories/DetailsCategory';

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
    this.setState({currentTime: data.currentTime});
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

  componentWillReceiveProps(nextProps) {
    console.log(111111);
  }
  async dataAudio() {
    console.log(22222);
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiRemove(keys, (err) => {
        console.log(err);
      });
    });
    await AsyncStorage.setItem("dataAudio", JSON.stringify(this.props.dataAudio));
    await AsyncStorage.setItem("hasAudio", JSON.stringify('false'));
  }

  // componentWillUnmount() {
  //   this.onPaused.remove();
  // }

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

  render() {

    let flexCompleted = this.getCurrentTimePercentage() * 100;
    let flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    const getStartValue = () => '0deg';
    const getEndValue = () => '360deg';

    const spin = this.state.spinValue.interpolate({
       inputRange: [0, 1],
       outputRange: [getStartValue(), getEndValue()]
     });


    return (
      <Animated.View style={[styles.container]}>
         <View style={[styles.column, {flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
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

             <Animated.Image source={{uri: this.props.dataAudio.image}} style={[styles.centering, {width: width/2, height: width/2, borderRadius: width/4, transform: [{rotate: spin}]}]}>
                 <ActivityIndicator animating={this.state.imageLoading} size="small" />
             </Animated.Image>

         </View>

         <View style={[styles.column, {alignItems: 'center', justifyContent: 'flex-end', padding: 10}]}>

            <View style={styles.rowBottom}><Text style={styles.white}>{this.props.dataAudio.name}</Text></View>

            <View style={[styles.row, styles.rowBottom]}>

                <View style={[styles.isLive, styles.row]}>
                  <Icon
                    name='circle'
                    type='font-awesome'
                    color='red'
                    size={4}
                  />
                  <Text style={[styles.white, styles.isLiveText]}>Live</Text>
                </View>

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
                     containerStyle={styles.circle}
                     onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
                   />

                   {
                     this.state.paused ?
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
                   onPress={() => this.changeLinkKaraoke(this.state.dataAudio.mp3_link)}
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
      </Animated.View>
    )
  }
}
