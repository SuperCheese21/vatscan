import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Map from '../common/Map';
import Text from '../common/Text';
import InfoPanelContainer from '../containers/InfoPanelContainer';
import { screenPropsShape } from '../propTypeShapes';
import { accent as accentColor } from '../../config/colors.json';

export default class MapScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="google-maps" size={20} color={tintColor} />
    ),
  };

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

  render() {
    const {
      screenProps: {
        stackNavigation,
        isLoading,
        filteredClients,
        focusedClient,
        panelPosition,
        setFocusedClient,
        collapsePanel,
      },
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Map style={{ flex: 1 }} onPress={collapsePanel}>
          {filteredClients.map(client => {
            const isFocusedClient = focusedClient.callsign === client.callsign;
            return client.getMapOverlay(isFocusedClient, setFocusedClient);
          })}
        </Map>
        <ActivityIndicator
          color={accentColor}
          animating={isLoading}
          style={styles.activityIndicator}
        />
        <Text style={styles.clientCountText}>
          {`Clients: ${filteredClients.length}`}
        </Text>
        <InfoPanelContainer
          stackNavigation={stackNavigation}
          panelPosition={panelPosition}
          focusedClient={focusedClient}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {
  screenProps: screenPropsShape.isRequired,
};

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
