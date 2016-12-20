import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //Menu
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerColumn: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    overflow: 'hidden',
    marginRight: 5,
    alignItems: 'center',
  },
  containerSlide: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  containerTimelines: {
    overflow: 'hidden'
  },
  containerAuth: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollArea: {
    flexDirection: 'row',
    backgroundColor: '#000',
    marginTop: 8,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
    margin: 5,
  },
  content: {
    alignItems: 'flex-start',
    flex: 1,
  },
  sectionHeader: {
    alignItems: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  //Menu
  menuView: {
    flex: 1,
    flexDirection: 'column'
  },
  menuUserView: {
    padding: 5,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#333',
  },
  menuUserInfoView: {
    flexDirection: 'row'
  },
  menuUserAvatar: {
    justifyContent: 'center',
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5
  },
  menuUserAvatarImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'white',
  },
  menuUserName: {
    justifyContent: 'center',
    flex: 1,
    paddingRight: 10,
    paddingVertical: 5
  },
  menuUserNameText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  menuContentView: {
    backgroundColor: '#0099cc',
  },
  menuContentItemView: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.4,
    paddingTop: 1
  },
  menuContentItemText: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Futura-CondensedMedium'
  },
  menuContentHeadView: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.4,
    backgroundColor: '#45bce2',
    paddingTop: 1
  },
  menuContentHeadText: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Futura-CondensedExtraBold',
  },
  NavIconMenu: {
    padding: 10
  },
  containerJustifyCenter: {
    justifyContent: 'center',
  },
  loginButton: {
    marginRight: 5,
    backgroundColor: '#45cbe2',
    padding: 3,
    borderRadius: 5
  },
  white: {
    color: '#FFFFFF'
  },
  iconSearch: {
    marginTop: 15,
    marginRight: 15,
  },
  iconBack: {
    marginTop: 5,
    marginLeft: 5
  },
  navigator: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: '#45cbe2',
  },
  NavIconMenu: {
    padding: 10
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 24
  },
  logoAudio: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center'
  },
  iconSearch: {
    marginTop: 15,
    marginRight: 15,
  },
  iconBack: {
    marginTop: 5,
    marginLeft: 5,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 24
  },

  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  thumbnailContainer: {
    marginLeft: 5,
    overflow: 'hidden'
  },
  titleContainer: {
    overflow: 'hidden',
    flexWrap: 'wrap'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 7,
    overflow: 'hidden',
    textAlign: 'center',
    paddingTop: 5
  },
  contentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  searchBar: {
    height: 100,
    flex: 1
  },
  tabs: {
    backgroundColor: '#000000',
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabsVideo: {
    backgroundColor: '#000000',
    position: 'absolute',
  },
  tabStyleVideo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSelectedstyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#45cbe2',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#FFFFFF'
  },
  selectedTitleStyle: {
    color: '#45cbe2'
  },
  // sectionHeader: {
  //   justifyContent: 'flex-start'
  // },
  textRight: {
    borderWidth: 1,
    borderColor:'#0099cc',
    backgroundColor: '#000000',
    borderRadius: 3,
    padding: 2,
    position: 'absolute',
    right: 10,
    top: 5
  },
  btnMoreContainer: {
    borderWidth: 1,
    borderColor:'#FFFFFF',
    backgroundColor: '#0099cc',
    borderRadius: 3,
    padding: 2,
    top: 5,
    position: 'absolute',
    right: 5
  },
  sectionText: {
    color: '#45cbe2',
    margin: 5
  },
  btnMore: {
    color: '#0099cc',
    fontSize: 9,
  },
  btnMoreText: {
    color: '#FFFFFF',
    fontSize: 9,
  },
  blocks: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  blocksColumn: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  hidden: {
    width: 0,
    height: 0
  },

  // Video Player
  containerVideo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backgroundVideoFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundAudioFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  navigationBarAudio: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    padding: 5,
    zIndex: 1000
  },
  playerAudioContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  bgOpacity: {
    backgroundColor: '#000000',
    opacity: .3,
    padding: 7,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    zIndex: 1
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  trackingControls: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 3
  },
  innerProgressCompleted: {
    height: 4,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 4,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 2,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 13,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  textDuration: {
    color: '#FFFFFF',
    fontSize: 8,
  },
  startDuration: {
    marginLeft: 5,
    zIndex: 2
  },
  endDuration: {
    marginRight: 5
  },
  iconKaraoke: {
    marginRight: 5
  },
  isLive: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 1,
    padding: 1,
    backgroundColor: 'transparent'
  },
  isLiveText: {
    fontSize: 8,
    paddingLeft: 2
  },
  waiting: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000000'
  },
  iconInfo: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  toggleData: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.8
  },
  toggleRelate: {
    position: 'absolute',
    left: 0
  },
  borderAround: {
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
    borderColor: '#696969',
    borderWidth: 1
  },
  textInfo: {
    fontSize: 10,
  },
  textInfoValue: {
    paddingLeft: 5
  },
  textInfoHeader: {
    color: '#45cbe2',
    fontSize: 12,
    marginBottom: 5
  },
  containerRelate: {
    flex: 1,
    position: 'absolute',
    padding: 5
  },
  timelinesContainer: {
    flex: 1,
    position: 'absolute',
  },
  oneRowContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5
  },
  border1px: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF'
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  marginRight: {
    marginRight: 5
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconPlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPause: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelinesItemContainer: {
    paddingBottom: 5,
    paddingTop: 5
  },
  timelinesSectionHeaderBgColor: {
    backgroundColor: '#0099cc',
    padding: 5,
  },
  subTitle: {
    fontSize: 8
  },
  black: {
    color: '#000000'
  },
  imageCircle: {
    borderRadius: 50
  },
  wrapperAudio: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  circle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 10,
    borderColor: '#FFFFFF'
  },
  circlePause: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 10,
    borderColor: '#FFFFFF'
  },
  circlePlay: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    borderColor: '#FFFFFF'
  },
  circleBottom: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 10,
    borderColor: '#FFFFFF'
  },
  circlePauseBottom: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    borderColor: '#FFFFFF'
  },
  circlePlayBottom: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    borderColor: '#FFFFFF'
  },
  iconRandom: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  iconList: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  groupButtonRadio: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  rowBottom: {
    marginBottom: 5,
    backgroundColor: 'transparent'
  },
  containerAudioBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  circleCloseButtonBottom: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#000000',
  },
  wrapperCloseButton: {
    position: 'absolute',
    right: 5,
    top: -12,
  },
  wrapperTextBottom: {
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 5
  },
  wrapperBtnPackage: {
    alignItems: 'flex-end',
  },
  btnPackage: {
    padding: 2,
    backgroundColor: '#0099cc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0099cc',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalWrapper: {
    backgroundColor: '#0099cc',
    borderRadius: 5,
    padding: 5
  },
  txtPromotion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 30
  },
  formGroup: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
    height: 20
  },
  link: {
    color: '#0099cc'
  },
  textinput: {
    height: 20
  },
  logoNavBarAudio: {
    flex: 1
  }
})
