import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

export default class AuthScreen extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: '991981838771-n8693cm72hk61f0dg9rutu1olln16ill.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
  //  alert('FUNC');

    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });

  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
       alert('DONE');
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  render() {
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <TouchableOpacity onPress={this.signInAsync} >
      <Text>Sign In</Text>
      </TouchableOpacity>
    </View>);
  }
}