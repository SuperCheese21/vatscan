import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { childrenShape, navigationShape } from '../propTypeShapes';
import { updateClients } from '../../redux/actions';
import { getIsLoading } from '../../redux/selectors';

class ConfigScreen extends PureComponent {
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
    const { children, dispatchUpdateClients, isLoading, refresh } = this.props;
    return (
      <KeyboardAvoidingView>
        <ScrollView
          refreshControl={
            refresh ? (
              <RefreshControl
                refreshing={isLoading}
                onRefresh={dispatchUpdateClients}
              />
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
  dispatchUpdateClients: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  navigation: navigationShape.isRequired,
  refresh: PropTypes.bool,
};

ConfigScreen.defaultProps = {
  children: null,
  refresh: false,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  dispatchUpdateClients: updateClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);
