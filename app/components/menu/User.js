import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, AsyncStorage } from 'react-native';
import styles from '../../styles/Style';
import Login from '../auth/Login';
import Search from '../search/Search';
import LoginButton from '../views/LoginButton';
import LogoutButton from '../views/LogoutButton';
import PurchasedContentButton from '../views/PurchasedContentButton';
import PurchasedPackageButton from '../views/PurchasedPackageButton';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
const defaultAvatar = 'http://static.onworldtv.com/themes/front/images/bg/avatar_full.jpg';
const defaultName = 'Guest';

import FBSDK from 'react-native-fbsdk';
const {
  AccessToken,
} = FBSDK;

export default class MenuUserView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        isFBLogin: false,
        dataFB: []
      }
  }

  componentWillReceiveProps(nextProps) {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        this.setState({
          isFBLogin: data != null ? true : false
        })
        if(data != null) {
          this.getDataFB().done();
        } else {
          this.setState({
            dataFB: null,
            loaded: false
          });
        }
      }
    );

    this.setUserData().done();
  }

  async getDataFB() {
    await AsyncStorage.getItem('dataFB').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);
      this.setState({
        dataFB: userData,
        loaded: true
      });
    });
  }

  async setUserData() {
    await AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);
      this.setState({
        userData: userData,
        loaded: true
      });
    });
  }

  renderAvatar() {
    let avatar = null;
    if(this.state.userData && this.state.userData.avatarsUrl) {
      avatar = this.state.userData.avatarsUrl;
    } else if(this.state.dataFB && this.state.dataFB.picture) {
      avatar = this.state.dataFB.picture.data.url;
    } else {
      avatar = defaultAvatar;
    }
    return avatar;
  }

  renderName() {
    let name = null;
    if(this.state.userData && this.state.userData.fullName) {
      name = this.state.userData.fullName;
    } else if(this.state.dataFB && this.state.dataFB.name) {
      name = this.state.dataFB.name;
    } else {
      name = defaultName;
    }
    return name;
  }

  render() {
    let avatar = this.renderAvatar();
    let name = this.renderName();
   return(
     <View style = {styles.menuUserView}>
       <View style = {styles.menuUserInfoView}>
         <View style = {styles.menuUserAvatar}>
           <Image source = {{uri: avatar}} style = {styles.menuUserAvatarImage} />
         </View>
         <View style = {styles.menuUserName}>
           <Text style = {styles.menuUserNameText}>{name}</Text>
         </View>
         {
           (this.state.userData || this.state.isFBLogin) ?
              <LogoutButton onItemSelected={this.props.onItemSelected} />
            :
              <LoginButton onItemSelected={this.props.onItemSelected} onMenuToogle={this.props.onMenuToogle} />
         }
       </View>

         {
           (this.state.userData || this.state.isFBLogin) ?
                <View>
                    <PurchasedContentButton onItemSelected={this.props.onItemSelected} />
                    <PurchasedPackageButton onItemSelected={this.props.onItemSelected} />
                </View>
            : null
         }
     </View>
   );
  }
}
