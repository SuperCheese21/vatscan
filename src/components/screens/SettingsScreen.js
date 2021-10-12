import React, { Component } from 'react';
import { View } from 'react-native';

import ConfigScreen from './ConfigScreen';

import { navigationShape } from '../propTypeShapes';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { navigation } = this.props;
    return (
      <ConfigScreen navigation={navigation}>
        <View style={{ flex: 1 }} />
      </ConfigScreen>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
