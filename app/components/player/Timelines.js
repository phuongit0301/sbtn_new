import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import styles from '../../styles/Style';
import DetailsCategory from '../categories/DetailsCategory';
import NavigationBar from 'react-native-navbar';

let {width, height} = Dimensions.get('window');
let top = (width/16*9) + 50;

export default class Timelines extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded    : false,
      animation   : new Animated.Value()
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

  showItems = (items) => {

    return (
      items.map((item, index) => {


        return(
          <View key={item.id}>
            <TouchableOpacity onPress={() => this.props.navigator.push({
                                                                          id: this.props.parentId,
                                                                          title: 'timelines',
                                                                          timeline: item,
                                                                          component: DetailsCategory,
                                                                          navigationBar: <NavigationBar
                                                                                            statusBar = {{ hidden: true }}
                                                                                            title={this.props.renderLogoNavBar()}
                                                                                            leftButton = { this.props.renderBackButton() }
                                                                                            style={styles.navigationBar}
                                                                                            rightButton = { this.props.renderNavIconSearch() }
                                                                                          />
                                                                        })}>

              <View style={[styles.row, styles.border1px, styles.timelinesItemContainer, {width: width}]}>
                  <Image source={{uri: item.image}} style={[styles.marginRight, { width: ((width/2) - 20), height: ((width/2 - 20)/16*9) }]} />
                  <View style={styles.titleContainer}>
                    <Text style={[styles.white]}>{item.name}</Text>
                    <Text style={[styles.white, styles.subTitle]}>{item.start} - {item.end}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          </View>
        )
      })
    )
  }

  createItem = (timelines) => {

    let icon = !this.state.expanded ? 'More' : 'Less';
    let setHeight = this.state.expanded ? this._setMaxHeight.bind(this) : this._setMinHeight.bind(this);
    let animation = this.state.expanded ? this.state.animation : this.state.minHeight;

    return (
      timelines.map((items, i) => {
        return (

          <Animated.View
            style={[styles.containerTimelines, styles.column, {height: animation}]} key={i}>

              <View style={[styles.row, styles.timelinesSectionHeaderBgColor]}>
                <Text style={styles.white}>{items.title}</Text>
                {
                  items.timeline.length > 2 ?
                    <TouchableOpacity style={styles.btnMoreContainer} onPress={this.toggle.bind(this)}>
                        <Text style={styles.btnMoreText}>{icon}</Text>
                    </TouchableOpacity>
                  : null
                }
              </View>

              <View style={styles.row}>
                <View style={[styles.blocksColumn]} onLayout={setHeight}>
                  { this.showItems(items.timeline)  }
                  </View>
              </View>

          </Animated.View>
        )
      })
    )
  }

  render() {
    return (
      <ScrollView style={[styles.timelinesContainer, {top: top, width: width,height: width}]}>
          { this.createItem(this.props.timelines) }
      </ScrollView>
    )
  }
}
