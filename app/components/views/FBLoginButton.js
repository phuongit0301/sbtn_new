import React, {Component} from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import FBSDK from 'react-native-fbsdk';
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class FBLoginButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    }
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

                const responseInfoCallback = (error: ?Object, result: ?Object) => {
                  if (error) {
                    console.log('Error fetching data: ' + error.toString());
                  } else {
                      AsyncStorage.setItem('dataFB', JSON.stringify(result));
                  }
                }

                // Create a graph request asking for user information with a callback to handle the response.
                const infoRequest = new GraphRequest(
                  '/me?fields=email,name,picture',
                  null,
                  responseInfoCallback
                );
                new GraphRequestManager().addRequest(infoRequest).start();

                this.setState({
                    isLogin: true
                })

              }
            }
          }
          onLogoutFinished={
            () => {
                alert("User logged out");
                AsyncStorage.removeItem('dataFB');
              }
            }/>
      </View>
    )
  }
}
