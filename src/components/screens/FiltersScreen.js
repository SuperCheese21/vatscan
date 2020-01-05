import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ConfigScreen from './ConfigScreen';

import { navigationShape } from '../propTypeShapes';

export default class FiltersScreen extends PureComponent {
  static navigationOptions = {
    title: 'Filters',
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

FiltersScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
