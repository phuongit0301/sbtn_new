import React, {Component} from 'react';

import {
  Alert,
  AsyncStorage,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking
} from 'react-native';

import { FormLabel, FormInput, CheckBox, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-elements';

import validateEmail from '../../validates/Validation';
import HomeView from '../home/Index';
import SignUp from './SignUp';
import LoginFB from './LoginFB';
import Authorization from '../../config/Authorization';

import styles from '../../styles/Style';
import constants from '../../constants/Types';
const {
  REQUEST_LOGIN_URL,
  REQUEST_FB_LOGIN_URL,
  REQUEST_FORGOT_PASSWORD_URL
} = constants;

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checked: false,
      loaded: false,
    }
  }

  componentWillMount() {
    this.getAuthorization().done();
  }

  async getAuthorization() {
    let authorization = await Authorization.generate('POST');
    this.setState({
      authorization: JSON.parse(authorization)
    })
  }

  _goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  async checkLogin() {

    if(!this.state.email) {
      this.printError('Please fill in the Email?');
      return false;
    }

    if(!validateEmail(this.state.email)) {
      this.printError('Your email address invalid?');
      return false;
    }

    if(!this.state.password) {
      this.printError('Please fill in the Password?');
      return false;
    }

    try {

      let user = {
        email: this.state.email,
        password: this.state.password
      }

      let formBody = [];
      for (let property in user) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(user[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      let response = await fetch(REQUEST_LOGIN_URL, {
                                  method: 'POST',
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'DateTime': this.state.authorization.DateTime,
                                    'RequestToken': this.state.authorization.RequestToken
                                  },
                                  body: formBody
                                });
      let responseJson = await response.json();
      if(!responseJson.data) {
        this.printError(responseJson.message);
        return false;
      }

      this.setState({
        loaded: true,
        userData: responseJson.data
      });

      //this.regenerateAuthorization(responseJson.data.accessToken).done();
      let setAuthorization = {
        'Authorization': responseJson.data.accessToken,
        'DateTime': this.state.authorization.DateTime,
        'RequestToken': this.state.authorization.RequestToken
      }
      AsyncStorage.setItem('authorizationPost', JSON.stringify(setAuthorization));
      AsyncStorage.setItem('userData', JSON.stringify(responseJson.data));
      this.props.onCategoryItemSelected({name: 'HOME'});
      // this.props.navigator.push({
      //                       id: null,
      //                       title: 'HOME',
      //                       component: HomeView,
      //                       navigationBar: <NavigationBar
      //                                         title={this.renderLogoNavBar()}
      //                                         statusBar = {{ hidden: true }}
      //                                         leftButton={this.renderNavIconMenu()}
      //                                         rightButton={this.renderNavIconSearch()}
      //                                         style={styles.navigationBar} />
      //   })
    } catch(error) {
      console.error(error);
    }
  }
  //
  // async regenerateAuthorization(accessToken) {
  //   let authorization = await Authorization.generate('GET', accessToken);
  //   await AsyncStorage.removeItem('authorization', (err) => {
  //     AsyncStorage.setItem('authorization', authorization);
  //   });
  // }

  printError(message) {
    return (
      Alert.alert(
        'Message',
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
    )
  }

  renderNavIconMenu() {
    return(
      <View style = { styles.NavIconMenu } >
        <Icon name = 'menu' color = 'white' onPress = { () => this.props.onMenuToogle() } />
      </View>
    )
  }

  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
          <Text style={styles.logo}>SBTN</Text>
      </TouchableOpacity>
    )
  }

  renderNavIconSearch() {
    return(
      <View style={styles.iconSearch}>
        <Icon
          name='search'
          type='font-awesome'
          color='#fff'
          size={15}
          onPress={() => this.bindOnPress()} />
      </View>
    )
  }

  renderBackButton() {
    return(
      <View style={styles.iconBack}>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.props.navigator.jumpBack()} />
      </View>
    )
  }

  bindOnPress() {
    this.props.navigator.push({
                          id: null,
                          title: 'SEARCH',
                          component: Search,
                          navigationBar: <NavigationBar title={this.renderLogoNavBar()} statusBar = {{ hidden: true }} leftButton={this.renderBackButton()}
                          style={styles.navigationBar} />
      })
  }

  render() {
    return(
      <View style={styles.containerAuth}>
        <View style={styles.column}>
          <Text style={styles.black}>Logo</Text>

          <View>
            <FormLabel>Email</FormLabel>
            <FormInput placeholder="Your email" onChangeText={(email) => this.setState({email})} value={this.state.email} />
          </View>

          <View>
            <FormLabel>Password</FormLabel>
            <FormInput placeholder="Your password" onChangeText={(password) => this.setState({password})} secureTextEntry={true} />
          </View>

          <View>
            <CheckBox
              title='Remember me'
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
              />
          </View>

          <View>
              <Text style={styles.link} onPress={() => this._goToURL(REQUEST_FORGOT_PASSWORD_URL)}>Forgot your password</Text>
          </View>

          <View>
            <View style={styles.row}>
              <Button title='Login' onPress={() => this.checkLogin().done()} />
              <Button title='Login by facebook'
                      onPress={() => this.props.navigator.push({
                                    id: null,
                                    component: LoginFB,
                                    navigationBar: <NavigationBar
                                                      statusBar = {{ hidden: true }}
                                                      leftButton = { this.renderBackButton() }
                                                      style={styles.navigationBar}
                                                      />

              })} />
            </View>
          </View>

          <View>
            <View style={styles.row}>
              <Text>Not a member?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigator.push({
                  id: null,
                  component: SignUp,
                  navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                    statusBar = {{ hidden: true }}
                                    leftButton = { this.renderBackButton() }
                                    style={styles.navigationBar}
                                 />

              })}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
              <Text> now</Text>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
