import React from 'react';
import { View } from 'react-native';

import ConfigScreen from './ConfigScreen';

const SettingsScreen = () => (
  <ConfigScreen>
    <View style={{ flex: 1 }} />
  </ConfigScreen>
);

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingsScreen;
