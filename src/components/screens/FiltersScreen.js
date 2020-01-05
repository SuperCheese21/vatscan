import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default class FiltersScreen extends PureComponent {
  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    return <View style={{ flex: 1 }} />;
  }
}
