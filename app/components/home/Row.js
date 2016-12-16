import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

const Row = (props) => (
  <View>
      <TouchableHighlight>
        <Image source={{uri: props.image}} style={{width:50, height:50}} />
      </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    flex: 1
  },
  menuContentItemView: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContentItemText: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Futura-CondensedMedium'
  }
});

export default Row;