import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Client from '../api/Client';
import Map from '../components/Map';
import {
  FlightPath,
  MapOverlays,
} from '../components/map-overlays/MapOverlays';
import Text from '../components/Text';
import { accent as accentColor } from '../config/colors.json';
import InfoPanelContainer from '../containers/InfoPanelContainer';

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    right: 3,
    top: 3,
  },
  clientCountText: {
    fontFamily: 'Roboto_Regular',
    position: 'absolute',
    left: 5,
    top: 2,
  },
});

export default class MapScreen extends React.PureComponent {
  componentDidMount() {
    const { screenProps } = this.props;

    // Add listener for Android hardware back button to close info panel
    BackHandler.addEventListener(
      'hardwareBackPress',
      screenProps.collapsePanel,
    );
  }

  componentWillUnmount() {
    const { screenProps } = this.props;

    // Remove back button listener before component is unmounted
    BackHandler.removeEventListener(
      'hardwareBackPress',
      screenProps.collapsePanel,
    );
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="google-maps" size={20} color={tintColor} />
    ),
  };

  render() {
    const { screenProps } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Map style={{ flex: 1 }} onPress={screenProps.collapsePanel}>
          <MapOverlays
            clients={screenProps.clients}
            focusedClient={screenProps.focusedClient}
            setFocusedClient={screenProps.setFocusedClient}
          />
          <FlightPath client={screenProps.focusedClient} />
        </Map>
        <ActivityIndicator
          color={accentColor}
          animating={screenProps.loading}
          style={styles.activityIndicator}
        />
        <Text style={styles.clientCountText}>
          {`Clients: ${screenProps.clients.length}`}
        </Text>
        <InfoPanelContainer
          stackNavigation={screenProps.stackNavigation}
          panelPosition={screenProps.panelPosition}
          focusedClient={screenProps.focusedClient}
        />
      </View>
    );
  }
}

const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

const screenPropsShape = PropTypes.shape({
  stackNavigation: navigationShape.isRequired,
  loading: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.instanceOf(Client)).isRequired,
  focusedClient: PropTypes.instanceOf(Client).isRequired,
  panelPosition: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
  collapsePanel: PropTypes.func.isRequired,
});

MapScreen.propTypes = {
  screenProps: screenPropsShape.isRequired,
};
