import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Animated, ActivityIndicator } from 'react-native';
import styles from '../../styles/Style';
import DetailsCategory from '../categories/DetailsCategory';
import NavigationBar from 'react-native-navbar';

let {width, height} = Dimensions.get('window');
let top = (width/16*9);

export default class RelateToggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded    : false,
      animation   : new Animated.Value(),
      imageLoading: true
    }
  }


    toggle() {
        let heightItem = ((width/16*9) + 30);

        this.setState({
            expanded : !this.state.expanded  //Step 2
        });

        //Step 1
        let initialValue    = this.state.expanded ? this.state.maxHeight + heightItem : this.state.minHeight,
            finalValue      = this.state.expanded ? this.state.minHeight : this.state.maxHeight + heightItem;

        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : (width/16*9)
        });
    }

  createItem = (dataRelate) => {
      let items = [];
      let widthContainer = width > height ? width * 0.3 : width;
      let widthImage = width > height ? ((width/2) - 20) : ((width/2) - 20);
      let heightImage = width > height ? ((width/2 - 20)/16*9) : ((width/2 - 20)/16*9);
      let grid = width > height ? styles.column : styles.row;
      let textColor = width > height ? styles.black : styles.white;

      if(dataRelate.timelines.length > 0) {
        items = dataRelate.timelines;
      } else if(dataRelate.episodes.length > 0) {
        items = dataRelate.episodes;
      } else {
        items = dataRelate.related;
      }

      return (
        <View style={[styles.column]} >
          {
            items.map((item, index) => {
              return(
                <View key={item.id}>
                  <TouchableOpacity key={item.id} onPress={() => this.props.navigator.push({
                                                                                id: item.id,
                                                                                title: 'Timelines',
                                                                                component: DetailsCategory,
                                                                                navigationBar: <NavigationBar
                                                                                                  title={this.props.renderLogoNavBar()}
                                                                                                  statusBar = {{ hidden: true }}
                                                                                                  leftButton = { this.props.renderBackButton() }
                                                                                                  style={styles.navigationBar}
                                                                                                  rightButton = { this.props.renderNavIconSearch() }
                                                                                                />
                                                                              })}>

                    <View style={[grid, styles.border1px, styles.timelinesItemContainer, {width: widthContainer}]}>
                        <Image source={{uri: item.image}}
                              style={[styles.marginRight, styles.centering, { width: widthImage, height: heightImage }]}
                              onLoadEnd={(e) => this.setState({imageLoading: false})}
                        >
                          <ActivityIndicator animating={this.state.imageLoading} size="small" />
                        </Image>
                        <View style={styles.titleContainer}>
                          <Text style={[textColor]}>{item.name}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
    )
  }

  render() {
    return (
      width > height ?
        <ScrollView style={[styles.toggleData, {width: width * 0.3, height: width}]}>
            { this.createItem(this.props.dataRelate) }
        </ScrollView>
      :
        <ScrollView style={[styles.containerRelate, {top: top, width: width,height: width}]}>
            { this.createItem(this.props.dataRelate) }
        </ScrollView>
    )
  }
}
