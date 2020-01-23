import { AppLoading, Linking } from 'expo';
import { loadAsync as loadFontsAsync } from 'expo-font';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';

import StackNavigator from './navigation/StackNavigator';
import { setFontsLoaded, updateClients } from '../redux/actions';
import { getFontsLoaded } from '../redux/selectors';

class Root extends PureComponent {
  componentDidMount() {
    const { dispatchUpdateClients } = this.props;

    // Automatically pull data update when internet connection is changed
    this.unsubscribe = NetInfo.addEventListener(dispatchUpdateClients);
  }

  componentWillUnmount() {
    // Unsubscribe from updates on internet connection changes
    this.unsubscribe();
  }

  loadFonts = async () => {
    /* eslint-disable global-require */
    await loadFontsAsync({
      Roboto_Regular: require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
      Roboto_Condensed_Regular: require('../../assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
      Roboto_Mono: require('../../assets/fonts/Roboto_Mono/RobotoMono-Regular.ttf'),
    });
    /* eslint-enable global-require */
  };

  render() {
    const { fontsLoaded, dispatchSetFontsLoaded } = this.props;

    // Show app loading screen if font is still being loaded
    if (!fontsLoaded) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={dispatchSetFontsLoaded}
          onError={console.warn}
        />
      );
    }

    // Otherwise show top-level view
    return <StackNavigator uriPrefix={Linking.makeUrl('/')} />;
  }
}

Root.propTypes = {
  dispatchSetFontsLoaded: PropTypes.func.isRequired,
  dispatchUpdateClients: PropTypes.func.isRequired,
  fontsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  fontsLoaded: getFontsLoaded(state),
});

const mapDispatchToProps = {
  dispatchSetFontsLoaded: setFontsLoaded,
  dispatchUpdateClients: updateClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
