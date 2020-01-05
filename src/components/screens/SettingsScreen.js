import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default class SettingsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return <View style={{ flex: 1 }} />;
  }
}
