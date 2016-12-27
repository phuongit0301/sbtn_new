import React, {Component} from 'react';

import { View, Image, Dimensions, ActivityIndicator } from 'react-native';

import ImageSlider from 'react-native-image-slider';
import DetailsCategory from '../categories/DetailsCategory';
import Search from '../search/Search';
import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-elements';
import styles from '../../styles/Style';

const { width, height } = Dimensions.get('window');
const imageDevice = width+'x'+height;

export default class Slider extends Component {

  constructor(props) {
      super(props);
      this.state = ({
        imageLoading: true,
        position: 1,
        interval: null,
      });
  }

  componentDidMount() {
    this.setState({interval: setInterval(() => {
        this.setState({position: this.state.position === this.state.listImageSlide ? 0 : this.state.position + 1});
    }, 2000)});
  }


  componentWillUnmount() {
      clearInterval(this.state.interval);
  }

  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
          <Text style={styles.logo}>SBTN</Text>
      </TouchableOpacity>
    )
  }
  renderBackButton() {
    return(
      <View style={styles.iconBack}>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.props.navigator.jumpBack()} />
      </View>
    )
  }
  renderNavIconSearch() {
    return(
      <View style={styles.iconSearch}>
        <Icon
          name='search'
          type='font-awesome'
          color='#fff'
          size={15}
          onPress={() => this.bindOnPress()} />
      </View>
    )
  }

  bindOnPress() {
    this.props.navigator.push({
                          id: null,
                          title: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} leftButton={this.renderBackButton()}
                          style={styles.navigationBar} />
      })
  }

  renderSlider(listImage) {
    var dataRender = [];
    if(listImage) {
      listImage.map((listImageSlide) => {
        dataRender.push(listImageSlide.image)
       });
    }

    return (
      listImage.length > 1 ?
        <ImageSlider images={dataRender} position={this.props.position}
                    onPositionChanged={this.props.onPositionChanged}
                    onPress={() => this.props.navigator.push({
                                                                id: data.id,
                                                                component: DetailsCategory,
                                                                navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                                                  leftButton = { this.renderBackButton() }
                                                                                  style={styles.navigationBar}
                                                                                  rightButton = { this.renderNavIconSearch() } />
                                                              })} />
      :
        <Image
          source={{uri: listImage[0].image}}
          style={[styles.centering, {width: width, height: width/16*9}]}
          onLoadEnd={(e) => this.setState({imageLoading: false})}
        >
          <ActivityIndicator animating={this.state.imageLoading} size="small" />
        </Image>
    );
  }

  render() {
    return(
      <View>
        {this.renderSlider(this.props.listImageSlide)}
      </View>
    );
  }
}
