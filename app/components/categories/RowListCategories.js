import React, {Component} from 'react';
import { View, Text, Image, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../../styles/Style';

let {width, height} = Dimensions.get('window');

export default class RowListCategories extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const imageWidth = (width/2) - 5;
    const imageHeight = (width/2)/16*9;

    return (
      <View style={styles.container}>

          <View style={[styles.sectionHeader]}>
              <Text style={styles.sectionText}>{this.props.name}</Text>
            {
              this.props.items.length > 6 ?
                <TouchableOpacity style={styles.textRight} onPress = { () => this.props.bindMoreItem() }>
                    <Text style={styles.btnMore}>More</Text>
                </TouchableOpacity>
              : null
            }
          </View>

          <View style={[styles.blocks]}>
            {
              this.props.items.map((data, index) => {
                const visibility = index > 5 ? styles.hidden : { width: imageWidth, height: imageHeight + 20};
                return(
                  <View key={this.props.id + '_' + index} style={visibility}>
                    <TouchableOpacity onPress = { () => this.props.bindOnDetail(data.id) }>
                      <View style={[styles.thumbnailContainer, styles.column]}>
                        <Image source={{uri: data.image}} style={{ width: imageWidth, height: imageHeight }} />
                        <View style={styles.titleContainer}>
                          <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{data.name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
      </View>
    );
  }
}
