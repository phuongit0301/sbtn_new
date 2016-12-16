import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/Style';
import DetailsCategory from '../categories/DetailsCategory';
import NavigationBar from 'react-native-navbar';

let {width, height} = Dimensions.get('window');
let top = (width/16*9) + 50;

export default Episodes = (props) => {
  const createItem = (item, i) => {
    return (
      <TouchableOpacity onPress={() => props.navigator.push({
                                                                    id: item.id,
                                                                    title: 'Episodes',
                                                                    component: DetailsCategory,
                                                                    navigationBar: <NavigationBar
                                                                                      title={props.renderLogoNavBar()}
                                                                                      statusBar = {{ hidden: true }}
                                                                                      leftButton = { props.renderBackButton() }
                                                                                      style={styles.navigationBar}
                                                                                      rightButton = { props.renderNavIconSearch() }
                                                                                    />
                                                                  })} key={item.id}>
        <View style={[styles.row, styles.oneRowContainer, ((props.episodes.length - 1) !== i) ? styles.border1px : {}]}>
          <Image source={{uri: item.image}} style={[{width: (width/2) - 20, height: (width/2)/16*9}]} />
          <View style={[styles.textInfoValue, styles.content]}>
            <Text style={[styles.white]}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={[styles.containerRelate, {top: top, width: width,height: width}]}>
        { props.episodes.map(createItem) }
    </ScrollView>
  )
}
