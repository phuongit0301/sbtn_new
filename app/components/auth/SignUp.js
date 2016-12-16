import React, {Component} from 'react';

import {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { FormLabel, FormInput, CheckBox, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-elements';

import validateEmail from '../../validates/Validation';
import HomeView from '../home/Index';
import Authorization from '../../config/Authorization';

import styles from '../../styles/Style';
import constants from '../../constants/Types';
const { REQUEST_REGISTER_URL } = constants;

export default class SIGNUP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
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

  async checkSignUp() {

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

    if(this.state.password != this.state.passwordConfirm) {
      this.printError('Your password and confirm password do not match?');
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

      let response = await fetch(REQUEST_REGISTER_URL, {
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

      if(!this.state.loaded) {
        this.waiting();
      }

      if(!responseJson.data) {
        this.printError(responseJson.message);
        return false;
      }

      if(responseJson.data.token == '') {
        this.printError(responseJson.message);
        return false;
      }

      this.setState({
        loaded: true
      });

      this.props.onCategoryItemSelected({name: 'HOME'});
    } catch(error) {
      console.error(error);
    }
  }

  waiting() {
    return(
      <View style={styles.centering}>
          <ActivityIndicator animating={this.state.loaded} size="small" />
      </View>
    )
  }
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

  render() {
    return(
      <View style={styles.containerAuth}>
        <View style={styles.column}>
          <Text style={styles.black}>Logo</Text>

          <View  style={styles.column}>

            <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
            placeholder={"Email Address"}
            />
          </View>

          <View  style={styles.column}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
              placeholder={"Password"}
            />
          </View>
          <View  style={styles.column}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({passwordConfirm: text})}
              value={this.state.passwordConfirm}
              secureTextEntry={true}
              placeholder={"Password Confirm"}
            />

          </View>

          <View>
            <TouchableOpacity onPress={() => this.checkSignUp()}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}
