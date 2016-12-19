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
  AccessToken
} = FBSDK;

export default class MenuUserView extends Component {

  constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        isFBLogin: false
      }
  }

  componentWillReceiveProps(nextProps) {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        this.setState({
          isFBLogin: data != null ? true : false
        })
      }
    );
    this.setUserData().done();
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

  render() {
    let avatar = this.state.userData && this.state.userData.avatarsUrl ? this.state.userData.avatarsUrl : defaultAvatar;
    let name = this.state.userData && this.state.userData.fullName ? this.state.userData.fullName : defaultName;
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
