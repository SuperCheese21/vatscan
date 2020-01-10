import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
} from 'react-native';

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
    const { children, onRefresh, refreshing } = this.props;
    return (
      <KeyboardAvoidingView>
        <ScrollView
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ) : null
          }
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

ConfigScreen.propTypes = {
  children: childrenShape,
  navigation: navigationShape.isRequired,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

ConfigScreen.defaultProps = {
  children: null,
  onRefresh: null,
  refreshing: false,
};
