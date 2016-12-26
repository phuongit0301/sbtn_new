import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import SideMenu from 'react-native-side-menu';

import MenuView from '../menu/Index';
import NavigatorView from './Navigation';
import ItemAudioPlayerBottom from '../player/ItemAudioPlayerBottom';
import styles from '../../styles/Style';

export default class ViewScenes extends Component {
  state = {
    isOpen: false,
    isAudio: false,
    selectedItem: {id: 1, name: 'HOME'},
  };
  toogle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // componentWillUpdate(prevProps, prevState)  {
  //   this.getDataAudio().done();
  // }


  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }
  onCategoryItemSelected = (item) => {
    this.setState({
       isOpen: false,
       selectedItem: item,
     });
   }

   onAudio = (bool) => {
     this.setState({
       isAudio: bool
     })
     if(bool) {
       this.getDataAudio().done();
     }
   }

   async getDataAudio() {
     let dataAudio = await AsyncStorage.getItem('dataAudio');

     this.setState({
       dataAudio: JSON.parse(dataAudio),
     })
   }

  render() {
    const menu = <MenuView onItemSelected={this.onMenuItemSelected} onMenuToogle={this.toogle} />;
    return (
      <View style={styles.container}>
        <SideMenu
          menu = {menu}
          isOpen = {this.state.isOpen}
          onChange = {(isOpen) => this.updateMenuState(isOpen)}
          openMenuOffset = {Dimensions.get('window').width * 0.6}
        >
          <NavigatorView onMenuToogle={() => this.toogle()} selectedItem = { this.state.selectedItem }
            onCategoryItemSelected = { this.onCategoryItemSelected }
            onAudio={this.onAudio} />
        </SideMenu>

        {
          this.state.isAudio && this.state.dataAudio ?
            <ItemAudioPlayerBottom
              dataAudio={this.state.dataAudio}
            />
          : null
        }
      </View>
    );
  }
}
