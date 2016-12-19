import React, {Component} from 'react';
import {
  View
} from 'react-native';
import FBSDK from 'react-native-fbsdk';
const {
  LoginButton,
  AccessToken
} = FBSDK;

export default class FBLoginButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.state.isLogin);
    this.props.navigator.popToTop();
  }

  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                console.log("Login was cancelled");
              } else {
                alert("Login was successful");

                this.setState({
                    isLogin: true
                })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    )
  }
}
