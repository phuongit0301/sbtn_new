import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  AppState,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from 'react-native';
import styles from '../../styles/Style';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements';
import RelateTab from './RelateTab';
import RelateToggle from './RelateToggle';
import Login from '../auth/Login';
import NavigationBar from 'react-native-navbar';

let {width, height} = Dimensions.get('window');

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      rate: 1.0,
      volume: 1.0,
      muted: false,
      paused: false,
      resizeMode: '',
      duration: 0.0,
      currentTime: 0.0,
      isToggle: false,
      dataVideo: [],
      dataRelate: [],
      selectedTab: 'information',
      imageLoading: true,
      linkVideo: '',
      linkKaraoke: false,
      width: 0,
      height: 0
    });
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.resizeModeControl.bind(this);
  }

  componentWillMount() {
    let resizeMode = width > height ? 'stretch' : 'contain';

    this.setState({
      resizeMode: resizeMode,
      dataVideo: this.props.dataVideo,
      dataRelate: this.props.dataRelate,
      linkVideo: this.props.dataVideo.link,
      width: width,
      height: height
    });
  }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false
    });
  }

  onProgress(data) {
    this.setState({
      currentTime: data.currentTime,
      imageLoading: false
    });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  resizeModeControl() {
    let resizeMode = this.state.resizeMode === 'contain' ? 'stretch' : 'contain';
    this.setState({
      resizeMode: resizeMode
    })
  }

  componentDidMount() {
    var that = this;
    this.onListener = this.props.navigator.navigationContext.addListener('willfocus', (event) => {
       this.setState({
         paused: true
       });
    });
    this.dataProcess().done();
  }

  async dataProcess() {
    await AsyncStorage.getAllKeys((err, keys) => {
      if(keys === 'dataAudio' || keys === 'hasAudio') {
          AsyncStorage.multiRemove(keys);
      }
    });

    let isLogin = JSON.parse(await AsyncStorage.getItem('isLogin'));

    this.setState({
      isLogin: isLogin,
      paused: isLogin ? false : true
    });
    this.checkLogin();
  }

  componentWillUnmount() {
    this.onListener.remove();
  }

  toHHMMSS(duration) {
    var hours = Math.floor(duration / 3600) < 10 ? ("00" + Math.floor(duration / 3600)).slice(-2) : Math.floor(duration / 3600);
    var minutes = ("00" + Math.floor((duration % 3600) / 60)).slice(-2);
    var seconds = ("00" + (duration % 3600) % 60).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }

  onPaused() {
    if(!this.state.isLogin) {
      this.checkLogin();
      this.setState({paused: true});
    } else {
      this.setState({paused: !this.state.paused});
    }
  }

  onInfo() {
    this.setState({isToggle: !this.state.isToggle});
  }

  changeLinkKaraoke(link) {
    let linkVideo = this.state.linkKaraoke ? link : this.state.linkVideo;
    this.setState({
      linkVideo: linkVideo,
      linkKaraoke: !this.state.linkKaraoke
    });
  }
  _onLayout = event => {
    let resizeMode = 'contain';

    if(event.nativeEvent.layout.width > event.nativeEvent.layout.height) {
        resizeMode = 'stretch';
    }

    this.setState({
      resizeMode: resizeMode,
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height
    });
  }

  renderNavIconMenu() {
    return(
      <View style = { styles.NavIconMenu } >
        <Icon name = 'menu' color = 'white' onPress = { () => this.props.onMenuToogle() } />
      </View>
    )
  }
  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
          <Text style={styles.logo}>SBTN</Text>
      </TouchableOpacity>
    )
  }

  renderNavIconSearch() {
    return(
      <View style={styles.iconSearch}>
          <Icon name='search' type='font-awesome' color='#fff' size={15} onPress={() => this.bindOnPress()} />
      </View>
    )
  }

  bindOnPress() {
    this.props.navigator.push({
                          id: null,
                          name: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderNavIconMenu()}
                                                        statusBar = {{ hidden: true }} style={styles.navigationBar} />
      })
  }

  onLogin() {
    this.props.navigator.push({
      id: null,
      name: 'LOGIN',
      component: Login,
      navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderNavIconMenu()}
                                    statusBar = {{ hidden: true }} rightButton={this.renderNavIconSearch()} style={styles.navigationBar}
                     />
    });
  }

  checkLogin() {
    return (
      !this.state.isLogin ?
          Alert.alert(
            'Message',
            'You need to login to view contents. Are you want to login now',
            [
              { text: 'Login', onPress: () => this.onLogin() },
              { text: 'Cancel', onPress: () => console.log('cancel') }
            ]
          )
      : null
    )
  }
  render() {
    let flexCompleted = this.getCurrentTimePercentage() * 100;
    let flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    let backgroundVideo = this.state.resizeMode === 'contain' ? styles.backgroundVideo : styles.backgroundVideoFull;
    let backgroundHeightVideo = this.state.resizeMode === 'contain' ? {height: width/16*9} : {height: height};

    const selectedTab = this.state.selectedTab;

    return (
      <View style={styles.containerVideo} onLayout={this._onLayout}>
        <View style={[backgroundVideo, backgroundHeightVideo]}>
          <Video source={{uri: this.state.linkVideo}} // Looks for .mp4 file (background.mp4) in the given expansion version.
               ref={(ref) => {
                 this.player = ref
               }}                             // Store reference
               rate={this.state.rate}                     // 0 is paused, 1 is normal.
               volume={this.state.volume}                  // 0 is muted, 1 is normal.
               muted={false}                  // Mutes the audio entirely.
               paused={this.state.paused}                // Pauses playback entirely.
               resizeMode={this.state.resizeMode}             // Fill the whole screen at aspect ratio.
               repeat={true}                  // Repeat forever.
               playInBackground={true}       // Audio continues to play when app entering background.
               playWhenInactive={true}       // [iOS] Video continues to play when control or notification center are shown.
               progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
               onLoadStart={this.loadStart}   // Callback when video starts to load
               onLoad={this.onLoad}      // Callback when video loads
               onProgress={this.onProgress}      // Callback every ~250ms with currentTime
               onEnd={this.onEnd}             // Callback when playback finishes
               onError={this.videoError}      // Callback when video cannot be loaded
               style={[backgroundVideo, backgroundHeightVideo]} />

               {
                 (this.state.isLogin && this.state.duration && this.state.resizeMode === 'contain') ?
                    <View style={{flex: 1}}>

                       <View style={[styles.playerContainer, styles.row]}>
                          {
                              this.state.dataVideo.isLive ?
                                <View style={[styles.isLive, styles.row]}>
                                  <Text style={[styles.white, {fontSize: 8}]}>Live</Text>
                                  <Icon
                                    name='circle'
                                    type='font-awesome'
                                    color='red'
                                    size={4}
                                  />
                                </View>
                              : null
                          }

                          <View>
                            <Text style={[styles.textDuration, styles.startDuration]}>{this.toHHMMSS(parseInt(this.state.currentTime))}</Text>
                          </View>

                          <View style={styles.trackingControls}>
                            <View style={styles.progress}>
                              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
                              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
                            </View>
                          </View>

                          <View>
                            <Text style={[styles.textDuration, styles.endDuration]}>{this.toHHMMSS(this.state.duration)}</Text>
                          </View>

                          {
                            this.state.dataVideo.cat_id == 5 ?
                              <View style={styles.iconKaraoke}>
                                <Icon
                                  name='microphone'
                                  type='font-awesome'
                                  color='#fff'
                                  size={8}
                                  onPress={() => this.changeLinkKaraoke(this.state.dataVideo.mp3_link)} />
                              </View>
                            : null
                          }

                          <View style={styles.iconResize}>
                            <Icon
                              name='arrows-alt'
                              type='font-awesome'
                              color='#fff'
                              size={8}
                              onPress={() => this.resizeModeControl()} />
                          </View>

                       </View>

                       {
                         this.state.paused ?
                           <View style={[styles.iconPlay, {top: ((width/16*9)/2 - 10)}]}>
                             <Icon
                               name='play'
                               type='font-awesome'
                               color='#fff'
                               size={12}
                               onPress={() => this.onPaused()} />
                           </View>
                         :
                           <View style={[styles.iconPause, {top: ((width/16*9)/2 - 10)}]}>
                             <Icon
                               name='pause'
                               type='font-awesome'
                               color='#fff'
                               size={12}
                               onPress={() => this.onPaused()} />
                           </View>
                       }

                       {
                           <View style={styles.iconInfo}>
                             <Icon
                               name='info-circle'
                               type='font-awesome'
                               color='#fff'
                               size={8}
                               onPress={() => this.onInfo()} />
                           </View>
                        }
                     </View>
                   :
                    !this.state.duration ?
                       <View>
                          <Image source={{uri: this.state.dataVideo.image}}
                              style={[styles.centering, {width: this.state.width, height: this.state.width/16*9}]}
                          >
                              {
                                this.state.paused ?
                                  <View style={[styles.iconPlay]}>
                                    <Icon
                                      name='play'
                                      type='font-awesome'
                                      color='#fff'
                                      size={12}
                                      onPress={() => this.onPaused()} />
                                  </View>
                                :
                                  <ActivityIndicator animating={this.state.imageLoading} size="small" />
                              }
                          </Image>
                       </View>
                     : null
                 }
       </View>

       {
          this.state.isToggle ?
            <RelateToggle navigator={this.props.navigator} dataRelate={this.state.dataRelate} />
          :
            this.state.resizeMode !== 'stretch' ?
              <RelateTab navigator={this.props.navigator} dataRelate={this.state.dataRelate} dataVideo={this.state.dataVideo} />
            : null
       }

      </View>
    );
  }
}
