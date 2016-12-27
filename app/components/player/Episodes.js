import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/Style';
import DetailsCategory from '../categories/DetailsCategory';
import NavigationBar from 'react-native-navbar';

let {width, height} = Dimensions.get('window');
let top = (width/16*9) + 50;

import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';

export default Episodes = (props) => {
  const createItem = (item, i) => {
    return (
      <TouchableOpacity onPress={() => props.navigator.push({
                                                                    id: item.id,
                                                                    title: 'Episodes',
                                                                    component: DetailsCategory,
                                                                    navigationBar: <NavigationBar
                                                                                      title={props.renderLogoNavBar()}
                                                                                      leftButton = { props.renderBackButton() }
                                                                                      style={styles.navigationBar}
                                                                                      rightButton = { props.renderNavIconSearch() }
                                                                                    />
                                                                  })} key={item.id}>
        <View style={[styles.row, styles.oneRowContainer, ((props.episodes.length - 1) !== i) ? styles.border1px : {}]}>
          <LazyloadImage source={{uri: item.image}} style={[{width: (width/2) - 20, height: (width/2)/16*9}]} host="lazyload-episodes" />
          <LazyloadView style={[styles.textInfoValue, styles.content]} host="lazyload-episodes">
            <Text style={[styles.white]}>{item.name}</Text>
          </LazyloadView>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <LazyloadScrollView style={[styles.containerRelate, {top: top, width: width,height: width}]}
        name="lazyload-episodes"
      >
        { props.episodes.map(createItem) }
    </LazyloadScrollView>
  )
}
