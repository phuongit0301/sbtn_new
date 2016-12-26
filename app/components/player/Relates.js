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

export default Relates = (props) => {
  const createItem = (item, i) => {
    return (
      <TouchableOpacity style={[{width: (width/2) - 10, height: (width/2)/16*9 + 20, overflow: 'hidden'}, (i % 2 == 0) ? styles.marginRight : null]} onPress={() => props.navigator.push({
                                                                    id: item.id,
                                                                    title: 'Relates',
                                                                    component: DetailsCategory,
                                                                    navigationBar: <NavigationBar
                                                                                      title={props.renderLogoNavBar()}
                                                                                      statusBar = {{ hidden: true }}
                                                                                      leftButton = { props.renderBackButton() }
                                                                                      style={styles.navigationBar}
                                                                                      rightButton = { props.renderNavIconSearch() }
                                                                                    />
                                                                  })} key={item.id}>
          <View>
            <LazyloadImage source={{uri: item.image}} style={[{width: (width/2), height: (width/2)/16*9}]} host="lazyload-relates" />
            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{item.name}</Text>
          </View>

      </TouchableOpacity>
    )
  }

  return (
    <LazyloadScrollView
    automaticallyAdjustInsets={false}
    style={[styles.containerRelate, {top: top, width: width, height: width + 20}]}
    contentContainerStyle={{paddingBottom: 50}}
    snapToAlignment="start"
    name="lazyload-relates"
    >
        <View style={styles.imageGrid}>
          { props.related.map(createItem) }
        </View>
    </LazyloadScrollView>
  )
}
