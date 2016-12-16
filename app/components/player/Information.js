import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import styles from '../../styles/Style';

let {width, height} = Dimensions.get('window');
let top = (width/16*9) + 50;

export default Information = (props) => {

    const renderContent = (key, text, border = false) => {
      return(
        <View style={styles.row}>
          <Text style={[styles.white, styles.textInfo]}>{key}:</Text>
          <Text style={[styles.white, styles.textInfo, styles.textInfoValue, border ? styles.borderAround : {}]}>
            {
              Array.isArray(text) ?
                text.map((data) => {
                  return data.name;
                }).join(', ')
              : text
            }
          </Text>
        </View>
      )
    }

    return (
      <ScrollView
         automaticallyAdjustInsets={false}
         snapToInterval={16}
         snapToAlignment="start"
         style={[styles.containerRelate, {top: top, width: width,height: height}]}
       >
        <View>
          <View style={styles.row}>
            <Text style={styles.textInfoHeader}>{ props.content.name ? props.content.name : null }</Text>
          </View>

          { props.genres.length > 0 ? renderContent('Genre', props.genres, true) : null }
          { props.countries.length > 0 ? renderContent('National', props.countries) : null }
          { props.content.duration ? renderContent('Duration', props.content.duration) : null }
          { props.content.year ? renderContent('Release year', props.content.year) : null }
          { props.directors ? renderContent('Directors', props.directors) : null }
          { props.actors ? renderContent('Actors', props.actors) : null }
          { props.tags ? renderContent('Tags', props.tags, true) : null }
          { props.content.description ? renderContent('Description', props.content.description) : null }

        </View>
      </ScrollView>
    )
}
