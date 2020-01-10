import React, { PureComponent } from 'react';
import { BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native';

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
    return (
      <KeyboardAvoidingView>
        <ScrollView>{children}</ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

ConfigScreen.propTypes = {
  children: childrenShape,
  navigation: navigationShape.isRequired,
};

ConfigScreen.defaultProps = {
  children: null,
};
