import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ConfigScreen from './ConfigScreen';

import { navigationShape } from '../propTypeShapes';

export default class SettingsScreen extends PureComponent {
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
