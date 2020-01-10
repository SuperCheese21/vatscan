import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';

import { childrenShape, navigationShape } from '../propTypeShapes';

export default class ConfigScreen extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  };

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

ConfigScreen.propTypes = {
  children: childrenShape.isRequired,
  navigation: navigationShape.isRequired,
};
