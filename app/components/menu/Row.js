import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import styles from '../../styles/Style';

const Row = (props) => (
  <View style={styles.container}>
      <TouchableHighlight onPress={() => props.onItemSelected('CATEGORIES')}>
        <Text style={styles.menuContentItemText}>
          {props.name}
        </Text>
      </TouchableHighlight>
  </View>
);

export default Row;
